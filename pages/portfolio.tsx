import React, { useState, useEffect } from "react";
import axios from "axios";
import { fetchPrices } from "../lib/fetchprices";

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

interface Holding {
  _id: string;
  company: string;
  ticker: string;
  shares: number;
  type: "long" | "short";
  buyPrice?: number;
  buyDate?: string;
}

export default function Portfolio() {
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [priceData, setPriceData] = useState<Record<string, number>>({});
  const [metaData, setMetaData] = useState<Record<string, PolygonSnapshot>>({});
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    fetchPortfolio();
  }, []);

  // Fetch live prices whenever holdings update
  useEffect(() => {
    if (holdings.length > 0) {
      const tickers = holdings.map((h) => h.ticker);
      fetchPrices(tickers).then(({ prices, meta }) => {
        setPriceData(prices);
        setMetaData(meta);
      });
    } else {
      setPriceData({});
      setMetaData({});
    }
  }, [holdings]);

  // Calculate total portfolio value
  const calculateValue = () =>
    holdings.reduce((total, h) => {
      const price = priceData[h.ticker] || 0;
      return total + (h.type === "long" ? h.shares * price : -h.shares * price);
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

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Public Portfolio</h1>

      {loading ? (
        <p>Loading...</p>
      ) : holdings.length === 0 ? (
        <p>No holdings found.</p>
      ) : (
        <>
          <p className="text-xl mb-6">
            Total Value: <strong>{formatCurrency(calculateValue())}</strong>
          </p>

          <table className="min-w-full bg-white border rounded-lg shadow-md text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 border-b">Company</th>
                <th className="px-4 py-3 border-b">Ticker</th>
                <th className="px-4 py-3 border-b">Shares</th>
                <th className="px-4 py-3 border-b">Type</th>
                <th className="px-4 py-3 border-b">Buy Price</th>
                <th className="px-4 py-3 border-b">CurrentPrice</th>
                <th className="px-4 py-3 border-b">Buy Date</th>
                <th className="px-4 py-3 border-b">Market Value</th>
                <th className="px-4 py-3 border-b">Daily Change (%)</th>
                <th className="px-4 py-3 border-b">
                  Performance Since Buy (%)
                </th>
              </tr>
            </thead>
            <tbody>
              {holdings.map((h) => {
                const price = priceData[h.ticker] || 0;
                const dailyChange = calculateDailyChangePercent(h.ticker);
                const changeSinceBuy = calculateChangeSinceBuy(h);

                return (
                  <tr key={h._id}>
                    <td className="px-4 py-3 border-b">{h.company}</td>
                    <td className="px-4 py-3 border-b">{h.ticker}</td>
                    <td className="px-4 py-3 border-b">{h.shares}</td>
                    <td className="px-4 py-3 border-b">
                      {h.type === "long" ? "Long" : "Short"}
                    </td>
                    {/* Buy Price */}
                    <td className="px-4 py-3 border-b">
                      {h.buyPrice ? formatCurrency(h.buyPrice) : "-"}
                    </td>
                    {/* Current Price */}
                    <td className="px-4 py-3 border-b">
                      {price ? formatCurrency(price) : "-"}
                    </td>
                    {/* Buy Date */}
                    <td className="px-4 py-3 border-b">
                      {h.buyDate
                        ? new Date(h.buyDate).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="px-4 py-3 border-b">
                      {price ? formatCurrency(h.shares * price) : "-"}
                    </td>
                    <td className="px-4 py-3 border-b">
                      {dailyChange.toFixed(2)}%
                    </td>
                    <td className="px-4 py-3 border-b">
                      {changeSinceBuy.toFixed(2)}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </main>
  );
}
