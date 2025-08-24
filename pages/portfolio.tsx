import React, { useState, useEffect } from "react";
import useMobile from "../hooks/useMobile";
import { Button } from "antd";

type FundType = "Thematic" | "Value" | "Quant";

export default function Portfolio() {
  const mobile = false;
  const [selectedFund, setSelectedFund] = useState<FundType>("Thematic");
  const [data, setData] = useState<string[][]>([]);
  const [shortData, setShortData] = useState<string[][]>([]);
  const [summaryData, setSummaryData] = useState<string[][]>([]);
  const [loading, setLoading] = useState(true);
  const [showCurrent, setShowCurrent] = useState(true);
  const [totalPortfolioValue, setTotalPortfolioValue] = useState(0);
  const [totalPortfolioReturn, setTotalPortfolioReturn] = useState(0);

  useEffect(() => {
    setLoading(true);

    const fetchPricesFromAPI = async (tickers: string[]) => {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 6000); // 6 -second timeout

      try {
        const res = await fetch(`/api/prices?tickers=${tickers.join(",")}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("Failed to fetch prices");
        return await res.json();
      } catch (err) {
        if (err instanceof Error) {
          console.warn("Fetch aborted or failed:", err.message);
        } else {
          console.warn("Unknown error during fetch.");
        }
        // Force fallback for all tickers
        return Object.fromEntries(tickers.map((t) => [t, NaN]));
      } finally {
        clearTimeout(timeout);
      }
    };

    const calculatePortfolioMetrics = (portfolioData: string[][]) => {
      if (portfolioData.length <= 1) return { totalValue: 0, totalReturn: 0 };

      let totalInitialValue = 0;
      let totalCurrentValue = 0;

      portfolioData.slice(1).forEach((row) => {
        const buyPrice = parseFloat(row[2].replace(/[$,]/g, ""));
        const currentPrice = parseFloat(row[3].replace(/[$,]/g, ""));
        const shares = parseInt(row[4]);

        if (!isNaN(buyPrice) && !isNaN(currentPrice) && !isNaN(shares)) {
          totalInitialValue += buyPrice * shares;
          totalCurrentValue += currentPrice * shares;
        }
      });

      const totalReturn =
        totalInitialValue > 0
          ? ((totalCurrentValue - totalInitialValue) / totalInitialValue) * 100
          : 0;

      return { totalValue: totalCurrentValue, totalReturn };
    };

    const fetchAndUpdate = async () => {
      if (selectedFund === "Thematic") {
        const thematicCurrent = [
          [
            "Company",
            "Ticker",
            "Buy Price (USD)",
            "Current Price (USD)",
            "Shares",
            "Return",
          ],
          ["Uber", "UBER", "$65.00", "$95.39", "1000", "46.75%"],
          ["Roblox", "RBLX", "$60.00", "$105.69", "1000", "76.12%"],
          ["Sezzle", "SEZL", "$30.00", "$134.73", "500", "349.10%"],
          ["WeBull", "BULL", "$11.50", "$12.48", "2000", "8.52%"],
        ];
        const thematicExited = [
          [
            "Company",
            "Ticker",
            "Buy Price (USD)",
            "Exit Price (USD)",
            "Shares",
            "Return",
          ],
        ];

        if (showCurrent) {
          const tickers = thematicCurrent.slice(1).map((row) => row[1]);
          const live = await fetchPricesFromAPI(tickers);
          const updated = thematicCurrent.map((row, i) => {
            if (i === 0) return row;
            const ticker = row[1];
            const buy = parseFloat(row[2].replace(/[$,]/g, ""));

            const curr = live[ticker];
            const fallback = parseFloat(row[3].replace(/[$,]/g, ""));
            const finalPrice = !isNaN(curr) ? curr : fallback;

            row[3] = `$${finalPrice.toFixed(2)}`;
            const ret = ((finalPrice - buy) / buy) * 100;
            row[5] = `${ret.toFixed(2)}%`;

            return row;
          });
          setData(updated);

          // Calculate portfolio metrics
          const metrics = calculatePortfolioMetrics(updated);
          setTotalPortfolioValue(metrics.totalValue);
          setTotalPortfolioReturn(metrics.totalReturn);
        } else {
          setData(thematicExited);

          // Calculate portfolio metrics for exited positions
          const metrics = calculatePortfolioMetrics(thematicExited);
          setTotalPortfolioValue(metrics.totalValue);
          setTotalPortfolioReturn(metrics.totalReturn);
        }

        setShortData([]);
        setSummaryData([["YTD %"], [`${totalPortfolioReturn.toFixed(2)}%`]]);
      } else if (selectedFund === "Value") {
        const currentLongData = [
          [
            "Company",
            "Ticker",
            "Buy Price (USD)",
            "Current Price (USD)",
            "Shares",
            "Return",
          ],
          ["Castlewood", "CWSRF", "$13.33", "$13.43", "500", "0.75%"],
          ["Welltower", "WELL", "$154.45", "$155.16", "100", "0.46%"],
          ["NVIDIA", "NVDA", "$141.72", "$164.92", "200", "16.37%"],
          ["Cellebrite", "CLBT", "$16.53", "$14.59", "300", "-11.74%"],
          ["UnitedHealth", "UNH", "$303.22", "$304.10", "50", "0.29%"],
          [
            "Fortress Transportation",
            "FTAI",
            "$122.55",
            "$110.98",
            "150",
            "-9.44%",
          ],
        ];

        const exitedLongData = [
          [
            "Company",
            "Ticker",
            "Buy Price (USD)",
            "Exit Price (USD)",
            "Shares",
            "Return",
          ],
          ["LTC Properties", "LTC", "$34.75", "$35.16", "200", "1.18%"],
          ["Sabra Healthcare", "SBRA", "$17.90", "$18.24", "300", "1.90%"],
          ["CareTrust REIT", "CTRE", "$28.10", "$29.33", "250", "4.38%"],
          ["Omega Healthcare", "OHI", "$36.07", "$37.02", "180", "2.63%"],
        ];

        const currentShortData = [
          [
            "Company",
            "Ticker",
            "Short Price (USD)",
            "Current Price (USD)",
            "Shares Shorted",
            "Return",
          ],
          ["Alphabet", "GOOG", "$171.62", "$181.31", "100", "-5.65%"],
        ];

        const exitedShortData = [
          [
            "Company",
            "Ticker",
            "Short Price (USD)",
            "Exit Price (USD)",
            "Shares Shorted",
            "Return",
          ],
          ["Tesla", "TSLA", "$294.70", "$275.08", "100", "6.66%"],
        ];

        if (showCurrent) {
          const tickers = currentLongData.slice(1).map((row) => row[1]);
          const live = await fetchPricesFromAPI(tickers);
          const updated = currentLongData.map((row, i) => {
            if (i === 0) return row;
            const ticker = row[1];
            const buy = parseFloat(row[2].replace(/[$,]/g, ""));

            const curr = live[ticker];
            const fallback = parseFloat(row[3].replace(/[$,]/g, ""));
            const finalPrice = !isNaN(curr) ? curr : fallback;

            row[3] = `$${finalPrice.toFixed(2)}`;
            const ret = ((finalPrice - buy) / buy) * 100;
            row[5] = `${ret.toFixed(2)}%`;

            return row;
          });

          const shortTickers = currentShortData.slice(1).map((row) => row[1]);
          const shortLive = await fetchPricesFromAPI(shortTickers);
          const updatedShort = currentShortData.map((row, i) => {
            if (i === 0) return row;
            const ticker = row[1];
            const shortPrice = parseFloat(row[2].replace(/[$,]/g, ""));

            const curr = shortLive[ticker];
            const fallback = parseFloat(row[3].replace(/[$,]/g, ""));
            const finalPrice = !isNaN(curr) ? curr : fallback;

            row[3] = `$${finalPrice.toFixed(2)}`;
            const ret = ((shortPrice - finalPrice) / shortPrice) * 100;
            row[5] = `${ret.toFixed(2)}%`;

            return row;
          });

          setData(updated);
          setShortData(updatedShort);

          // Calculate portfolio metrics for long positions
          const longMetrics = calculatePortfolioMetrics(updated);

          // Calculate short position impact (simplified - just for display)
          let shortImpact = 0;
          if (updatedShort.length > 1) {
            updatedShort.slice(1).forEach((row) => {
              const shortPrice = parseFloat(row[2].replace(/[$,]/g, ""));
              const currentPrice = parseFloat(row[3].replace(/[$,]/g, ""));
              const shares = parseInt(row[4]);
              if (
                !isNaN(shortPrice) &&
                !isNaN(currentPrice) &&
                !isNaN(shares)
              ) {
                shortImpact += (shortPrice - currentPrice) * shares;
              }
            });
          }

          setTotalPortfolioValue(longMetrics.totalValue + shortImpact);
          setTotalPortfolioReturn(longMetrics.totalReturn);
        } else {
          setData(exitedLongData);
          setShortData(exitedShortData);

          // Calculate portfolio metrics for exited positions
          const longMetrics = calculatePortfolioMetrics(exitedLongData);
          setTotalPortfolioValue(longMetrics.totalValue);
          setTotalPortfolioReturn(longMetrics.totalReturn);
        }

        setSummaryData([["YTD %"], [`${totalPortfolioReturn.toFixed(2)}%`]]);
      } else {
        setData([]);
        setSummaryData([]);
      }

      setLoading(false);
    };

    fetchAndUpdate();
  }, [selectedFund, showCurrent]);

  const summary = {
    percent: totalPortfolioReturn.toFixed(2) + "%",
  };

  return (
    <main
      className="w-full mt-10 px-4 sm:px-6 md:px-16 lg:px-22 xl:px-28 2xl:px-32 py-12"
      data-aos="fade-right"
    >
      <h1 className="text-semiblack font-bold text-2xl sm:text-3xl lg:text-5xl mb-4 text-center lg:text-left">
        Our Portfolio
      </h1>
      <p className="text-semiblack text-base sm:text-lg md:text-xl mb-10 max-w-[800px]">
        Marble operates a three fund strategy composing of thematic, value, and
        quantitative approaches.
      </p>
      <div className="flex flex-wrap gap-4 mb-10">
        {(["Thematic", "Value", "Quant"] as FundType[]).map((fund, key) => (
          <Button
            key={key}
            type={selectedFund === fund ? "primary" : "default"}
            onClick={() => setSelectedFund(fund)}
            className={`${
              selectedFund === fund
                ? "bg-lapis hover:bg-lapis/80 text-neutral-50"
                : "bg-white text-black border border-black"
            } font-montserrat font-normal flex justify-center items-center rounded-md ${
              mobile
                ? "text-sm md:text-base w-20 px-[4rem]"
                : "text-lg xl:text-xl w-60 py-6"
            }`}
          >
            {fund} Fund
          </Button>
        ))}
      </div>

      {selectedFund === "Thematic" && (
        <>
          {/* Position Type Toggle for Thematic Fund */}
          <div className="flex flex-wrap gap-4 mb-6">
            <Button
              type={showCurrent ? "primary" : "default"}
              onClick={() => setShowCurrent(true)}
              className={`${
                showCurrent
                  ? "bg-lapis hover:bg-lapis/80 text-neutral-50"
                  : "bg-white text-black border border-black"
              } font-montserrat font-normal flex justify-center items-center rounded-md ${
                mobile
                  ? "text-sm md:text-base w-24 px-2"
                  : "text-lg xl:text-xl w-32 py-4"
              }`}
            >
              Current
            </Button>
            <Button
              type={!showCurrent ? "primary" : "default"}
              onClick={() => setShowCurrent(false)}
              className={`${
                !showCurrent
                  ? "bg-lapis hover:bg-lapis/80 text-neutral-50"
                  : "bg-white text-black border border-black"
              } font-montserrat font-normal flex justify-center items-center rounded-md ${
                mobile
                  ? "text-sm md:text-base w-24 px-2"
                  : "text-lg xl:text-xl w-32 py-4"
              }`}
            >
              Exited
            </Button>
          </div>
          <p className="text-semiblack font-bold text-xl sm:text-2xl md:text-3xl mb-10 max-w-[800px]">
            Growth: <span className="font-normal">High</span>
            <span className="inline-block w-8" />
            Risk: <span className="font-normal">High</span>
            <span className="inline-block w-8" />
            YTD Return:{" "}
            <span
              className={`font-normal ${
                summary.percent.includes("-")
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              {summary.percent}
            </span>
          </p>
        </>
      )}

      {selectedFund === "Value" && (
        <>
          {/* Position Type Toggle for Value Fund */}
          <div className="flex flex-wrap gap-4 mb-6">
            <Button
              type={showCurrent ? "primary" : "default"}
              onClick={() => setShowCurrent(true)}
              className={`${
                showCurrent
                  ? "bg-lapis hover:bg-lapis/80 text-neutral-50"
                  : "bg-white text-black border border-black"
              } font-montserrat font-normal flex justify-center items-center rounded-md ${
                mobile
                  ? "text-sm md:text-base w-24 px-2"
                  : "text-lg xl:text-xl w-32 py-4"
              }`}
            >
              Current
            </Button>
            <Button
              type={!showCurrent ? "primary" : "default"}
              onClick={() => setShowCurrent(false)}
              className={`${
                !showCurrent
                  ? "bg-lapis hover:bg-lapis/80 text-neutral-50"
                  : "bg-white text-black border border-black"
              } font-montserrat font-normal flex justify-center items-center rounded-md ${
                mobile
                  ? "text-sm md:text-base w-24 px-2"
                  : "text-lg xl:text-xl w-32 py-4"
              }`}
            >
              Exited
            </Button>
          </div>
          <p className="text-semiblack font-bold text-xl sm:text-2xl md:text-3xl mb-10 max-w-[800px]">
            Growth: <span className="font-normal">Moderate</span>
            <span className="inline-block w-8" />
            Risk: <span className="font-normal">Low</span>
            <span className="inline-block w-8" />
            YTD Return:{" "}
            <span
              className={`font-normal ${
                summary.percent.includes("-")
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              {summary.percent}
            </span>
          </p>
        </>
      )}
      {!mobile && (
        <>
          <section className="overflow-x-auto mb-12">
            {loading ? (
              <p>Loading {selectedFund.toLowerCase()} fund...</p>
            ) : data.length > 1 ? (
              <table className="min-w-full bg-white border rounded-lg shadow-md text-left">
                <thead className="bg-gray-100 text-sm sm:text-base">
                  <tr>
                    {data[0].map((header, i) => (
                      <th key={i} className="px-4 py-3 border-b">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-sm sm:text-base">
                  {data.slice(1).map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      {row.map((cell, j) => (
                        <td key={j} className="px-4 py-3 border-b">
                          {cell.replace(/[^\d.,%\/-]/g, "") || cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Coming Soon!</p>
            )}
            {(selectedFund === "Thematic" || selectedFund === "Value") && (
              <p className="text-sm text-gray-500 italic mt-4">
                Results shown are unaudited and for illustrative purposes only.
              </p>
            )}
          </section>
        </>
      )}

      {/* Short Positions Table for Value Fund */}
      {!mobile && selectedFund === "Value" && shortData.length > 1 && (
        <section className="overflow-x-auto mb-12">
          <h3 className="text-semiblack font-bold text-xl sm:text-2xl md:text-3xl mb-6">
            {showCurrent ? "Current Short Positions" : "Exited Short Positions"}
          </h3>
          <table className="min-w-full bg-white border rounded-lg shadow-md text-left">
            <thead className="bg-gray-100 text-sm sm:text-base">
              <tr>
                {shortData[0].map((header, i) => (
                  <th key={i} className="px-4 py-3 border-b">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-sm sm:text-base">
              {shortData.slice(1).map((row, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  {row.map((cell, j) => (
                    <td key={j} className="px-4 py-3 border-b">
                      {cell.replace(/[^\d.,%\/-]/g, "") || cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-sm text-gray-500 italic mt-4">
            Short positions shown are unaudited and for illustrative purposes
            only.
          </p>
        </section>
      )}
    </main>
  );
}

const SummaryCard = ({
  label,
  value,
  color = "text-black",
}: {
  label: string;
  value: string;
  color?: string;
}) => (
  <div className="bg-gray-50 rounded-lg p-4 shadow">
    <h3 className="text-sm font-medium text-gray-600">{label}</h3>
    <p className={`text-2xl font-bold ${color}`}>{value || "-"}</p>
  </div>
);
