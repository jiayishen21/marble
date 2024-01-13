import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import "chartjs-adapter-moment";
import moment from "moment";

const ShareChart = () => {
  const shares = useSelector((state: RootState) => state.shares.shares);

  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (shares.length > 0 && chartRef.current) {
      const existingChart = Chart.getChart(chartRef.current);

      // If there's an existing chart, destroy it
      if (existingChart) {
        existingChart.destroy();
      }

      const dates = shares.map((entry) => moment(entry.date)); // Handle potential undefined date
      const prices = shares.map((entry) => entry.price);

      console.log(dates.reverse().map((date) => date.format("YYYY-MM-DD")));

      // Get the canvas element
      const ctx = chartRef.current.getContext("2d");

      if (ctx) {
        // Create a line chart
        new Chart(ctx, {
          type: "line",
          data: {
            labels: dates.reverse().map((date) => date.format("YYYY-MM-DD")), // Reverse the order for chronological display
            datasets: [
              {
                label: "Share Price History",
                data: prices.reverse(), // Reverse the order for chronological display
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 2,
                fill: false,
              },
            ],
          },
          options: {
            scales: {
              x: {
                type: "time", // Use "time" for dates
                position: "bottom",
                time: {
                  unit: "day", // Adjust the time unit as needed
                },
              },
              y: {
                beginAtZero: false,
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
