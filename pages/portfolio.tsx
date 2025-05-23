import React, { useState, useEffect } from "react";
import useMobile from "../hooks/useMobile";
import { Button } from "antd";

type FundType = "Thematic" | "Value" | "Quant";

export default function Portfolio() {
  const { mobile } = useMobile();
  const [selectedFund, setSelectedFund] = useState<FundType>("Thematic");
  const [data, setData] = useState<string[][]>([]);
  const [summaryData, setSummaryData] = useState<string[][]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    // Manually set data here per fund
    if (selectedFund === "Thematic") {
      setData([
        ["Company", "Ticker", "Buy Date", "Buy Price (USD)", "Current Price (USD)", "Weight", "Return"],
        ["Uber", "UBER", "1/3/2025", "$65.00", "$88.67", "27%", "36.42%"],
        ["Roblox", "RBLX", "1/3/2025", "$60.00", "$81.16", "23%", "35.45%"],
        ["Sezzle", "SEZL", "4/7/2025", "$30.00", "$99.11", "17%", "212.63%"],
      ]);

      setSummaryData([
        ["YTD %"],
        ["27.5%"]
      ]);
    } else {
      setData([]);
      setSummaryData([]);
    }

    setLoading(false);
  }, [selectedFund]);

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
    <main className="w-full mt-10 px-4 sm:px-6 md:px-16 lg:px-22 xl:px-28 2xl:px-32 py-12" data-aos="fade-right">
      <h1 className="text-semiblack font-bold text-2xl sm:text-3xl lg:text-5xl mb-4 text-center lg:text-left">
        Our Portfolio
      </h1>
      <p className="text-semiblack text-base sm:text-lg md:text-xl mb-10 max-w-[800px]">
        Marble operates a three fund strategy composing of thematic, value, and quantitative approaches.
      </p>
      <div className="flex flex-wrap gap-4 mb-10">
        {(["Thematic", "Value", "Quant"] as FundType[]).map((fund, key) => (
          <Button
            key={key}
            type={selectedFund === fund ? "primary" : "default"}
            onClick={() => setSelectedFund(fund)}
            className={`${selectedFund === fund
              ? "bg-lapis hover:bg-lapis/80 text-neutral-50"
              : "bg-white text-black border border-black"
              } font-montserrat font-normal flex justify-center items-center rounded-md ${mobile
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
            Our thematic fund consists of companies poised to generate immense value from current social, economic, and technological trends.
          </p>
          <p className="text-semiblack font-bold text-xl sm:text-2xl md:text-3xl mb-10 max-w-[800px]">
            Growth: <span className="font-normal">High</span>
            <span className="inline-block w-8" />
            Risk: <span className="font-normal">High</span>
            <span className="inline-block w-8" />
            YTD Return:{" "}
            <span className={`font-normal ${summary.percent.includes("-") ? "text-red-600" : "text-green-600"}`}>
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
          {selectedFund === "Thematic" && (
           <p className="text-sm text-gray-500 italic mt-4">
            Results shown are unaudited and for illustrative purposes only.  
          </p>
          )}
        </section>
      )}
    </main>
  );
}

const SummaryCard = ({ label, value, color = "text-black" }: { label: string; value: string; color?: string }) => (
  <div className="bg-gray-50 rounded-lg p-4 shadow">
    <h3 className="text-sm font-medium text-gray-600">{label}</h3>
    <p className={`text-2xl font-bold ${color}`}>{value || "-"}</p>
  </div>
);
