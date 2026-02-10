import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip
);

function PortfolioChart({ history }) {
  if (!history || history.length === 0) {
    return <p style={{color: '#475569'}}>Waiting for performance data...</p>;
  }

  const data = {
    labels: history.map((_, i) => i + 1),
    datasets: [
      {
        label: "Value",
        data: history,
        borderColor: "#38bdf8", // Neon Blue
        backgroundColor: "rgba(56, 189, 248, 0.1)",
        pointBackgroundColor: "#fff",
        pointBorderColor: "#38bdf8",
        borderWidth: 2,
        fill: true,
        tension: 0.3 // Smooth line
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: { grid: { color: '#1e293b' }, ticks: {color: '#64748b'} },
      y: { grid: { color: '#1e293b' }, ticks: {color: '#64748b'} }
    }
  };

  return <Line data={data} options={options} />;
}

export default PortfolioChart;