import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import "chartjs-adapter-moment";
import moment from "moment-timezone";

const ShareChart = () => {
  const shares = useSelector((state: RootState) => state.shares.shares);

  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (shares.length > 0 && chartRef.current) {
      const existingChart = Chart.getChart(chartRef.current);

      if (existingChart) {
        existingChart.destroy();
      }

      const oldDate = shares.map((entry) => moment(entry.date));
      const prices = shares.map((entry) => entry.price);
      const dates = oldDate.reverse().map((date) => date.format("YYYY-MM-DD"));

      const addOneDay = (dateString: any) => {
        const currentDate = new Date(dateString);
        currentDate.setDate(currentDate.getDate() + 1);
        return currentDate.toISOString().split("T")[0];
      };

      const newDates = dates.map(addOneDay);

      console.log(newDates);

      const ctx = chartRef.current.getContext("2d");

      if (ctx) {
        // Create a line chart
        new Chart(ctx, {
          type: "line",
          data: {
            labels: newDates,
            datasets: [
              {
                label: "Share Price History",
                data: prices.reverse(),
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 2,
                fill: false,
              },
            ],
          },
          options: {
            scales: {
              x: {
                type: "time",
                position: "bottom",
                time: {
                  unit: "day",
                },
              },
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }
    }
  }, [shares]);

  return <canvas ref={chartRef} className="w-full h-full"></canvas>;
};

export default ShareChart;
