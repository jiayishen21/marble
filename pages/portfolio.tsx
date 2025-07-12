import React, { useState, useEffect } from "react";
import useMobile from "../hooks/useMobile";
import { Button } from "antd";

type FundType = "Thematic" | "Value" | "Quant";

export default function Portfolio() {
  const { mobile } = useMobile();
  const [selectedFund, setSelectedFund] = useState<FundType>("Thematic");
  const [data, setData] = useState<string[][]>([]);
  const [shortData, setShortData] = useState<string[][]>([]);
  const [summaryData, setSummaryData] = useState<string[][]>([]);
  const [loading, setLoading] = useState(true);
  const [showCurrent, setShowCurrent] = useState(true);

  useEffect(() => {
    setLoading(true);

    // Manually set data here per fund
    if (selectedFund === "Thematic") {
      const thematicCurrent = [
        [
          "Company",
          "Ticker",
          "Buy Price (USD)",
          "Current Price (USD)",
          "Weight",
          "Return",
        ],
        ["Uber", "UBER", "$65.00", "$95.39", "30%", "46.75%"],
        ["Roblox", "RBLX", "$60.00", "$105.69", "32.5%", "76.12%"],
        ["Sezzle", "SEZL", "$30.00", "$134.73", "7.5%", "349.10%"],
        ["WeBull", "BULL", "$11.50", "$12.48", "11.5%", "8.52%"],
      ];
      const thematicExited = [
        [
          "Company",
          "Ticker",
          "Buy Price (USD)",
          "Exit Price (USD)",
          "Weight",
          "Return",
        ],
      ];
      setData(showCurrent ? thematicCurrent : thematicExited);
      setShortData([]);
      setSummaryData([["YTD %"], ["65.20%"]]);
    } else if (selectedFund === "Value") {
      // Current long positions
      const currentLongData = [
        [
          "Company",
          "Ticker",
          "Buy Price (USD)",
          "Current Price (USD)",
          "Weight",
          "Return",
        ],
        ["Castlewood", "CWSRF", "$13.33", "$13.43", "12.5%", "0.75%"],
        ["Welltower", "WELL", "$154.45", "$155.16", "22.5%", "0.46%"],
        ["NVIDIA", "NVDA", "$141.72", "$164.92", "40.0%", "16.37%"],
        ["Cellebrite", "CLBT", "$16.53", "$14.59", "4.5%", "-11.74%"],
        ["UnitedHealth", "UNH", "$303.22", "$304.10", "3.0%", "0.29%"],
        [
          "Fortress Transportation",
          "FTAI",
          "$122.55",
          "$110.98",
          "4.5%",
          "-9.44%",
        ],
      ];

      // Exited long positions
      const exitedLongData = [
        [
          "Company",
          "Ticker",
          "Buy Price (USD)",
          "Exit Price (USD)",
          "Weight",
          "Return",
        ],
        ["LTC Properties", "LTC", "$34.75", "$35.16", "10.0%", "1.18%"],
        ["Sabra Healthcare", "SBRA", "$17.90", "$18.24", "8.0%", "1.90%"],
        ["CareTrust REIT", "CTRE", "$28.10", "$29.33", "8.0%", "4.38%"],
        ["Omega Healthcare", "OHI", "$36.07", "$37.02", "10.0%", "2.63%"],
      ];

      // Current short positions
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

      // Exited short positions
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

      setData(showCurrent ? currentLongData : exitedLongData);
      setShortData(showCurrent ? currentShortData : exitedShortData);
      setSummaryData([["YTD %"], ["6.77%"]]);
    } else {
      setData([]);
      setSummaryData([]);
    }

    setLoading(false);
  }, [selectedFund, showCurrent]);

  const summary = {
    percent: "",
  };

  if (summaryData.length >= 2) {
    const labels = summaryData[0];
    const values = summaryData[1];
    labels.forEach((label, i) => {
      const key = label.toLowerCase().trim();
      const value = values[i]?.trim();
      if (key.includes("%")) summary.percent = value;
    });
  }

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
          <p className="text-semiblack text-base sm:text-lg md:text-xl mb-6 max-w-[800px]">
            Our thematic fund consists of companies poised to generate immense
            value from current social, economic, and technological trends.
          </p>
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
          <p className="text-semiblack text-base sm:text-lg md:text-xl mb-6 max-w-[800px]">
            Our value fund focuses on established companies with strong
            fundamentals, consistent earnings, and attractive valuations
            relative to their intrinsic worth.
          </p>
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
