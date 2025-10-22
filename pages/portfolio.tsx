import React, { useState, useEffect } from "react";
import axios from "axios";
import { fetchPrices } from "../lib/fetchprices";
import useMobile from "../hooks/useMobile";

// Interface for data returned from Polygon snapshot
interface PolygonSnapshot {
  ticker: string;
  day?: {
    c?: number; // close price
    o?: number; // open price
  };
  lastTrade?: {
    p?: number; // last trade price
  };
  prevDay?: {
    c?: number;
  };
}

type Tab = "current" | "closed" | "legacy";

// Map tickers to funds; defaults to "flagship" when not specified
const tickerToFund: Record<string, "flagship" | "experimental" | "legacy"> = {
  // Example:
  // AAPL: "flagship",
  // NVDA: "experimental",
  // MSFT: "legacy",
};

interface Holding {
  _id: string;
  ticker: string;
  shares: number;
  fund?: "flagship" | "experimental" | "legacy";
  session?: "pre-market" | "market" | "post-market" | "other";
  buyPrice?: number;
  buyDate?: string; // e.g., "Q1 2024", "Q2 2025"
}

interface ClosedHolding extends Omit<Holding, "session"> {
  session?: "2023" | "2024" | "2025";
  exitPrice?: number;
  exitDate?: string; // e.g., "Q3 2024", "Q4 2025"
}

export default function Portfolio() {
  const { mobile } = useMobile();
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [closed, setClosed] = useState<ClosedHolding[]>([]);
  const [priceData, setPriceData] = useState<Record<string, number>>({});
  const [metaData, setMetaData] = useState<Record<string, PolygonSnapshot>>({});
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState<Tab>("current");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  // Fetch portfolio from backend
  const fetchPortfolio = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/holdings");
      setHoldings(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch holdings:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchClosed = async () => {
    try {
      const res = await axios.get("/api/holdings/closed");
      setClosed(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch closed holdings:", err);
    }
  };

  useEffect(() => {
    fetchPortfolio();
    fetchClosed();
  }, []);

  // Fetch live prices whenever holdings or closed positions update
  useEffect(() => {
    const allTickers = [
      ...holdings.map((h) => h.ticker),
      ...closed.map((h) => h.ticker),
    ];
    const uniqueTickers = Array.from(new Set(allTickers)); // Remove duplicates

    if (uniqueTickers.length > 0) {
      fetchPrices(uniqueTickers).then(({ prices, meta }) => {
        setPriceData(prices);
        setMetaData(meta);
      });
    } else {
      setPriceData({});
      setMetaData({});
    }
  }, [holdings, closed]);

  // Calculate total portfolio value (exclude legacy fund)
  const calculateValue = () =>
    holdings
      .filter((h) => (h.fund || getFundForTicker(h.ticker)) !== "legacy")
      .reduce((total, h) => {
        const price = priceData[h.ticker] || 0;
        return total + h.shares * price;
      }, 0);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);

  // Calculate daily change percentage
  const calculateDailyChangePercent = (ticker: string) => {
    const snapshot = metaData[ticker];
    const currentPrice = priceData[ticker];

    // Use previous day's close from Polygon's prevDay object
    const prevClose = snapshot?.prevDay?.c;
    if (!prevClose || !currentPrice) return 0;
    return ((currentPrice - prevClose) / prevClose) * 100;
  };

  // Calculate percentage change since buy
  const calculateChangeSinceBuy = (holding: Holding) => {
    const currentPrice = priceData[holding.ticker];
    if (!holding.buyPrice || !currentPrice) return 0;
    return ((currentPrice - holding.buyPrice) / holding.buyPrice) * 100;
  };

  const getFundForTicker = (
    ticker: string
  ): "flagship" | "experimental" | "legacy" => {
    return tickerToFund[ticker] || "flagship";
  };

  // Sorting functions
  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortData = <T extends any>(
    data: T[],
    key: string,
    direction: "asc" | "desc"
  ): T[] => {
    return [...data].sort((a, b) => {
      let aVal: any = a[key as keyof T];
      let bVal: any = b[key as keyof T];

      // Handle special cases for calculated values
      if (key === "currentPrice") {
        aVal = priceData[(a as any).ticker] || 0;
        bVal = priceData[(b as any).ticker] || 0;
      } else if (key === "dailyChange") {
        aVal = calculateDailyChangePercent((a as any).ticker);
        bVal = calculateDailyChangePercent((b as any).ticker);
      } else if (key === "changeSinceBuy") {
        aVal = calculateChangeSinceBuy(a as any);
        bVal = calculateChangeSinceBuy(b as any);
      } else if (key === "weight") {
        const total = calculateValue();
        const aPrice = priceData[(a as any).ticker] || 0;
        const bPrice = priceData[(b as any).ticker] || 0;
        const aWeight =
          total > 0 ? (((a as any).shares * aPrice) / total) * 100 : 0;
        const bWeight =
          total > 0 ? (((b as any).shares * bPrice) / total) * 100 : 0;
        aVal = aWeight;
        bVal = bWeight;
      } else if (key === "percentChange") {
        aVal =
          (a as any).buyPrice && (a as any).exitPrice
            ? (((a as any).exitPrice - (a as any).buyPrice) /
                (a as any).buyPrice) *
              100
            : 0;
        bVal =
          (b as any).buyPrice && (b as any).exitPrice
            ? (((b as any).exitPrice - (b as any).buyPrice) /
                (b as any).buyPrice) *
              100
            : 0;
      } else if (key === "changeSinceSell") {
        aVal =
          (a as any).exitPrice && priceData[(a as any).ticker]
            ? ((priceData[(a as any).ticker] - (a as any).exitPrice) /
                (a as any).exitPrice) *
              100
            : 0;
        bVal =
          (b as any).exitPrice && priceData[(b as any).ticker]
            ? ((priceData[(b as any).ticker] - (b as any).exitPrice) /
                (b as any).exitPrice) *
              100
            : 0;
      }

      if (typeof aVal === "string" && typeof bVal === "string") {
        return direction === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      if (typeof aVal === "number" && typeof bVal === "number") {
        return direction === "asc" ? aVal - bVal : bVal - aVal;
      }

      return 0;
    });
  };

  const getSortIcon = (key: string) => {
    if (!sortConfig || sortConfig.key !== key) {
      return "↕";
    }
    return sortConfig.direction === "asc" ? "↑" : "↓";
  };

  const groupBySession = <
    T extends { session?: "pre-market" | "market" | "post-market" | "other" }
  >(
    items: T[]
  ) => {
    const buckets = {
      "pre-market": [] as T[],
      market: [] as T[],
      "post-market": [] as T[],
      other: [] as T[],
    };
    for (const item of items) {
      const key = item.session || "market";
      buckets[key].push(item);
    }
    return buckets;
  };

  const groupByYear = <T extends { session?: string }>(items: T[]) => {
    const buckets = {
      "2023": [] as T[],
      "2024": [] as T[],
      "2025": [] as T[],
    };
    for (const item of items) {
      const session = item.session;
      let key: "2023" | "2024" | "2025" = "2024"; // default to 2024

      // Handle new year-based sessions
      if (session === "2023" || session === "2024" || session === "2025") {
        key = session;
      }
      // Handle old session-based values - map them to years
      else if (session === "pre-market") {
        key = "2023";
      } else if (session === "market") {
        key = "2024";
      } else if (session === "post-market") {
        key = "2025";
      } else if (session === "other") {
        key = "2024"; // default other to 2024
      }

      buckets[key].push(item);
    }
    return buckets;
  };

  const calculateFundValue = (items: Holding[]) =>
    items.reduce((total, h) => {
      const price = priceData[h.ticker] || 0;
      return total + h.shares * price;
    }, 0);

  const renderFundSection = (
    label: string,
    items: Holding[],
    closedItems: ClosedHolding[]
  ) => {
    const isLegacy = label.toLowerCase().includes("legacy");
    const description = isLegacy
      ? "Placeholder description for the Legacy portfolio."
      : label.toLowerCase().includes("closed")
      ? "Placeholder description for closed positions by session."
      : "Placeholder description for current positions by session.";

    // Apply sorting to items
    const sortedItems = sortConfig
      ? sortData(items, sortConfig.key, sortConfig.direction)
      : items;

    return (
      <section className="mb-10">
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="text-2xl font-semibold">{label}</h2>
          {!isLegacy && selectedTab === "current" && (
            <span className="text-lg text-gray-700">
              Total:{" "}
              <strong>{formatCurrency(calculateFundValue(items))}</strong>
            </span>
          )}
        </div>
        <p className="text-gray-600 mb-4">{description}</p>
        <table className="min-w-full bg-white border-collapse border rounded-lg shadow-md text-left">
          <thead className="bg-gray-100">
            <tr>
              <th
                className="px-4 py-3 border-b cursor-pointer hover:bg-gray-200 select-none"
                onClick={() => handleSort("ticker")}
              >
                Ticker {getSortIcon("ticker")}
              </th>
              <th
                className="px-4 py-3 border-b cursor-pointer hover:bg-gray-200 select-none"
                onClick={() => handleSort("buyPrice")}
              >
                Buy Price {getSortIcon("buyPrice")}
              </th>
              <th
                className="px-4 py-3 border-b cursor-pointer hover:bg-gray-200 select-none"
                onClick={() => handleSort("currentPrice")}
              >
                Current Price {getSortIcon("currentPrice")}
              </th>
              <th
                className="px-4 py-3 border-b cursor-pointer hover:bg-gray-200 select-none"
                onClick={() => handleSort("buyDate")}
              >
                Buy Date {getSortIcon("buyDate")}
              </th>
              {!isLegacy && (
                <th
                  className="px-4 py-3 border-b cursor-pointer hover:bg-gray-200 select-none"
                  onClick={() => handleSort("dailyChange")}
                >
                  Daily Change (%) {getSortIcon("dailyChange")}
                </th>
              )}
              <th
                className="px-4 py-3 border-b cursor-pointer hover:bg-gray-200 select-none"
                onClick={() => handleSort("changeSinceBuy")}
              >
                (%) Since Buy {getSortIcon("changeSinceBuy")}
              </th>
              {!isLegacy && selectedTab === "current" && (
                <th
                  className="px-4 py-3 border-b cursor-pointer hover:bg-gray-200 select-none"
                  onClick={() => handleSort("weight")}
                >
                  Portfolio Weight (%) {getSortIcon("weight")}
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {sortedItems.map((h, index) => {
              const price = priceData[h.ticker] || 0;
              const dailyChange = calculateDailyChangePercent(h.ticker);
              const changeSinceBuy = calculateChangeSinceBuy(h);
              const total = calculateValue();
              const weightPct =
                total > 0 ? ((h.shares * price) / total) * 100 : 0;

              return (
                <tr key={h._id}>
                  <td className="px-4 py-3 border-b">{h.ticker}</td>
                  <td className="px-4 py-3 border-b">
                    {h.buyPrice ? formatCurrency(h.buyPrice) : "-"}
                  </td>
                  <td className="px-4 py-3 border-b">
                    {price ? formatCurrency(price) : "-"}
                  </td>
                  <td className="px-4 py-3 border-b">{h.buyDate ?? "-"}</td>
                  {!isLegacy && (
                    <td className="px-4 py-3 border-b">
                      {dailyChange.toFixed(2)}%
                    </td>
                  )}
                  <td className="px-4 py-3 border-b">
                    {changeSinceBuy.toFixed(2)}%
                  </td>
                  {!isLegacy && selectedTab === "current" && (
                    <td className="px-4 py-3 border-b">
                      {weightPct.toFixed(2)}%
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>

        {closedItems.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-3">Closed Positions</h3>
            <table className="min-w-full bg-white border-collapse border rounded-lg shadow-md text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th
                    className="px-4 py-3 border-b cursor-pointer hover:bg-gray-200 select-none"
                    onClick={() => handleSort("ticker")}
                  >
                    Ticker {getSortIcon("ticker")}
                  </th>
                  <th
                    className="px-4 py-3 border-b cursor-pointer hover:bg-gray-200 select-none"
                    onClick={() => handleSort("buyPrice")}
                  >
                    Buy Price {getSortIcon("buyPrice")}
                  </th>
                  <th
                    className="px-4 py-3 border-b cursor-pointer hover:bg-gray-200 select-none"
                    onClick={() => handleSort("exitPrice")}
                  >
                    Exit Price {getSortIcon("exitPrice")}
                  </th>
                  <th
                    className="px-4 py-3 border-b cursor-pointer hover:bg-gray-200 select-none"
                    onClick={() => handleSort("buyDate")}
                  >
                    Buy Date {getSortIcon("buyDate")}
                  </th>
                  <th
                    className="px-4 py-3 border-b cursor-pointer hover:bg-gray-200 select-none"
                    onClick={() => handleSort("exitDate")}
                  >
                    Exit Date {getSortIcon("exitDate")}
                  </th>
                  <th
                    className="px-4 py-3 border-b cursor-pointer hover:bg-gray-200 select-none"
                    onClick={() => handleSort("percentChange")}
                  >
                    Percent Change {getSortIcon("percentChange")}
                  </th>
                  <th
                    className="px-4 py-3 border-b cursor-pointer hover:bg-gray-200 select-none"
                    onClick={() => handleSort("changeSinceSell")}
                  >
                    Change Since Sell {getSortIcon("changeSinceSell")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortData(
                  closedItems,
                  sortConfig?.key || "",
                  sortConfig?.direction || "asc"
                ).map((h, index) => {
                  const perf =
                    h.buyPrice && h.exitPrice
                      ? ((h.exitPrice - h.buyPrice) / h.buyPrice) * 100
                      : 0;
                  return (
                    <tr key={h._id}>
                      <td className="px-4 py-3 border-b">{h.ticker}</td>
                      <td className="px-4 py-3 border-b">
                        {h.buyPrice ? formatCurrency(h.buyPrice) : "-"}
                      </td>
                      <td className="px-4 py-3 border-b">
                        {h.exitPrice ? formatCurrency(h.exitPrice) : "-"}
                      </td>
                      <td className="px-4 py-3 border-b">{h.buyDate ?? "-"}</td>
                      <td className="px-4 py-3 border-b">
                        {h.exitDate ?? "-"}
                      </td>
                      <td className="px-4 py-3 border-b">
                        {h.buyPrice && h.exitPrice
                          ? (
                              ((h.exitPrice - h.buyPrice) / h.buyPrice) *
                              100
                            ).toFixed(2)
                          : "-"}
                        %
                      </td>
                      <td className="px-4 py-3 border-b">
                        {h.exitPrice && priceData[h.ticker]
                          ? (
                              ((priceData[h.ticker] - h.exitPrice) /
                                h.exitPrice) *
                              100
                            ).toFixed(2)
                          : "-"}
                        %
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    );
  };

  const renderClosedSection = (label: string, items: ClosedHolding[]) => {
    // Apply sorting to items
    const sortedItems = sortConfig
      ? sortData(items, sortConfig.key, sortConfig.direction)
      : items;

    return (
      <section className="mb-10">
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="text-2xl font-semibold">{label}</h2>
        </div>
        <p className="text-gray-600 mb-4">
          Placeholder description for closed positions.
        </p>
        <table className="min-w-full bg-white border-collapse border rounded-lg shadow-md text-left">
          <thead className="bg-gray-100">
            <tr>
              <th
                className="px-4 py-3 border-b cursor-pointer hover:bg-gray-200 select-none"
                onClick={() => handleSort("ticker")}
              >
                Ticker {getSortIcon("ticker")}
              </th>
              <th
                className="px-4 py-3 border-b cursor-pointer hover:bg-gray-200 select-none"
                onClick={() => handleSort("buyPrice")}
              >
                Buy Price {getSortIcon("buyPrice")}
              </th>
              <th
                className="px-4 py-3 border-b cursor-pointer hover:bg-gray-200 select-none"
                onClick={() => handleSort("exitPrice")}
              >
                Exit Price {getSortIcon("exitPrice")}
              </th>
              <th
                className="px-4 py-3 border-b cursor-pointer hover:bg-gray-200 select-none"
                onClick={() => handleSort("buyDate")}
              >
                Buy Date {getSortIcon("buyDate")}
              </th>
              <th
                className="px-4 py-3 border-b cursor-pointer hover:bg-gray-200 select-none"
                onClick={() => handleSort("exitDate")}
              >
                Exit Date {getSortIcon("exitDate")}
              </th>
              <th
                className="px-4 py-3 border-b cursor-pointer hover:bg-gray-200 select-none"
                onClick={() => handleSort("percentChange")}
              >
                Percent Change {getSortIcon("percentChange")}
              </th>
              <th
                className="px-4 py-3 border-b cursor-pointer hover:bg-gray-200 select-none"
                onClick={() => handleSort("changeSinceSell")}
              >
                Change Since Sell {getSortIcon("changeSinceSell")}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedItems.map((h) => {
              return (
                <tr key={h._id}>
                  <td className="px-4 py-3 border-b">{h.ticker}</td>
                  <td className="px-4 py-3 border-b">
                    {h.buyPrice ? formatCurrency(h.buyPrice) : "-"}
                  </td>
                  <td className="px-4 py-3 border-b">
                    {h.exitPrice ? formatCurrency(h.exitPrice) : "-"}
                  </td>
                  <td className="px-4 py-3 border-b">{h.buyDate ?? "-"}</td>
                  <td className="px-4 py-3 border-b">{h.exitDate ?? "-"}</td>
                  <td className="px-4 py-3 border-b">
                    {h.buyPrice && h.exitPrice
                      ? (
                          ((h.exitPrice - h.buyPrice) / h.buyPrice) *
                          100
                        ).toFixed(2)
                      : "-"}
                    %
                  </td>
                  <td className="px-4 py-3 border-b">
                    {h.exitPrice && priceData[h.ticker]
                      ? (
                          ((priceData[h.ticker] - h.exitPrice) / h.exitPrice) *
                          100
                        ).toFixed(2)
                      : "-"}
                    %
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    );
  };

  return (
    <main className="p-8 lg:p-12 2xl:py-16 2xl:px-36">
      <h1 className="text-5xl font-bold mb-6">Public Portfolio</h1>

      {loading ? (
        <p>Loading...</p>
      ) : holdings.length === 0 ? (
        <p>No holdings found.</p>
      ) : (
        <>
          {selectedTab === "current" && (
            <p className="text-xl mb-6">
              Total Value: <strong>{formatCurrency(calculateValue())}</strong>
            </p>
          )}

          <section className="w-full flex gap-[1rem] mb-6">
            {[
              { key: "current", label: "Current Positions" },
              { key: "closed", label: "Closed Positions" },
              { key: "legacy", label: "Legacy" },
            ].map((item, index) => (
              <button
                key={item.key}
                className={`flex items-center justify-center w-fit rounded-full gap-[0.5rem] px-[1.25rem] py-[0.75rem] text-base text-[#17499A] ${
                  selectedTab === (item.key as Tab)
                    ? "bg-[#E7F6F9] border-2 border-[#17499A]"
                    : "bg-none border border-transparent"
                }`}
                onClick={() => setSelectedTab(item.key as Tab)}
              >
                {item.label}
              </button>
            ))}
          </section>

          {(() => {
            if (selectedTab === "legacy") {
              const legacyHoldings = holdings.filter(
                (h) => (h.fund || getFundForTicker(h.ticker)) === "legacy"
              );
              const legacyClosed = closed.filter(
                (h) => (h.fund || getFundForTicker(h.ticker)) === "legacy"
              );
              return renderFundSection(
                "Legacy Fund",
                legacyHoldings,
                legacyClosed
              );
            }

            if (selectedTab === "current") {
              const current = holdings.filter(
                (h) => (h.fund || getFundForTicker(h.ticker)) !== "legacy"
              );
              const {
                ["pre-market"]: pre,
                market,
                ["post-market"]: post,
                other,
              } = groupBySession(current);
              return (
                <>
                  {renderFundSection("Pre-market", pre, [])}
                  {renderFundSection("Market", market, [])}
                  {renderFundSection("Post-market", post, [])}
                  {renderFundSection("Other", other, [])}
                </>
              );
            }

            // closed tab
            const closedNonLegacy = closed.filter(
              (h) => (h.fund || getFundForTicker(h.ticker)) !== "legacy"
            );
            const {
              "2023": year2023,
              "2024": year2024,
              "2025": year2025,
            } = groupByYear(closedNonLegacy);
            return (
              <>
                {renderClosedSection("2023", year2023)}
                {renderClosedSection("2024", year2024)}
                {renderClosedSection("2025", year2025)}
              </>
            );
          })()}
        </>
      )}
    </main>
  );
}
