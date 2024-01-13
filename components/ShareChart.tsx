// ChartComponent.tsx
import React from "react";
import { Line } from "react-chartjs-2";
import { ShareType } from "../types";

interface ChartProps {
  data: ShareType[];
}

const ShareChart: React.FC<ChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map((entry) => entry.time),
    datasets: [
      {
        label: "Price",
        data: data.map((entry) => entry.price),
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  return <Line data={chartData} />;
};

export default ShareChart;
