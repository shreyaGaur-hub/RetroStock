import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

function PortfolioChart({ history }) {
  if (!history || history.length === 0) {
    return <p>No performance data yet...</p>;
  }

  const data = {
    labels: history.map((_, i) => i + 1),
    datasets: [
      {
        label: "Portfolio Value",
        data: history,
        borderColor: "green"
      }
    ]
  };

  return (
    <div>
      <h2>Performance</h2>
      <Line data={data} />
    </div>
  );
}

export default PortfolioChart;
