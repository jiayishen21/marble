import React, { useEffect, useState } from "react";
import useMobile from "../hooks/useMobile";
import { Button } from "antd";

type FundType = "Thematic" | "Value" | "Quant";

const sheetUrls = {
    Thematic:
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vR9JwGOF7O9uVaLEWHr6mnckl8nMuhute2kIKesYuEx2KBxaw19ph3yvZfWIjlTMU4aN9wBl2LZ-nHy/pub?gid=212975475&single=true&output=csv",
    ThematicSummary:
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vR9JwGOF7O9uVaLEWHr6mnckl8nMuhute2kIKesYuEx2KBxaw19ph3yvZfWIjlTMU4aN9wBl2LZ-nHy/pub?gid=1056952550&single=true&output=csv",
    Value: "https://docs.google.com/spreadsheets/d/e/your_value_csv/pub?output=csv",
    Quant: "https://docs.google.com/spreadsheets/d/e/your_quant_csv/pub?output=csv",
};

export default function Portfolio() {
    const { mobile } = useMobile();
    const [selectedFund, setSelectedFund] = useState<FundType>("Thematic");
    const [data, setData] = useState<string[][]>([]);
    const [summaryData, setSummaryData] = useState<string[][]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCSV = async (url: string) => {
            const res = await fetch(url);
            const text = await res.text();
            return text.trim().split("\n").map((row) => row.split(","));
        };

        const loadData = async () => {
            setLoading(true);
            try {
                const [portfolio, summary] = await Promise.all([
                    fetchCSV(sheetUrls[selectedFund]),
                    selectedFund === "Thematic" ? fetchCSV(sheetUrls.ThematicSummary) : Promise.resolve([]),
                ]);

                setData(portfolio);

                const start = summary.findIndex((row) => row.includes("Current Cash Marble"));
                const slice = summary.slice(start, start + 2);
                setSummaryData(slice);
            } catch (err) {
                console.error("Data fetch error:", err);
                setData([]);
                setSummaryData([]);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [selectedFund]);

    const summary = {
        currentCash: "",
        currentPortfolio: "",
        currentValue: "",
        percent: "",
    };

    if (summaryData.length >= 2) {
        const labels = summaryData[0];
        const values = summaryData[1];
        labels.forEach((label, i) => {
            const key = label.toLowerCase().trim();
            const value = values[i]?.trim();
            if (key.includes("current cash")) summary.currentCash = value;
            if (key.includes("current portfolio")) summary.currentPortfolio = value;
            if (key.includes("current value")) summary.currentValue = value;
            if (key.includes("%")) summary.percent = value;
        });
    }

    return (
        <main className="w-full mt-10 px-4 sm:px-6 md:px-16 lg:px-22 xl:px-28 2xl:px-32 py-12"
            data-aos="fade-right">
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                        <SummaryCard label="Current Cash" value={summary.currentCash} />
                        <SummaryCard label="Current Portfolio" value={summary.currentPortfolio} />
                        <SummaryCard label="Current Value" value={summary.currentValue} />
                        <SummaryCard label="Initial Value" value={"200000"} />  
                    </div>
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
                                                {cell.replace(/[^\d.,%\-]/g, "") || cell}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>Coming Soon!</p>
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
