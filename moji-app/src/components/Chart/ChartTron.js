import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const ChartTron = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const myPieChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Red", "Blue", "Yellow"],
        datasets: [
          {
            data: [300, 50, 100],
            backgroundColor: ["#ff6384", "#36a2eb", "#ffce56"],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
        },
      },
    });

    return () => {
      myPieChart.destroy();
    };
  }, []);

  return <canvas ref={chartRef} style={{ width: "100%", height: "100%" }} />;
};

export default ChartTron;
