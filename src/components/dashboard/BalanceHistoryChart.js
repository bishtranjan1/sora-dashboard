import React, { useState, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const BalanceHistoryChart = ({ initialPeriod = "6m", fixedPeriod = false }) => {
  const [period, setPeriod] = useState(initialPeriod);
  const chartRef = useRef(null);

  // Define chart data for different periods
  const periodData = {
    "1w": {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      values: [3200, 3400, 3300, 5200, 4800, 4000, 4500],
    },
    "1m": {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      values: [3200, 3800, 5000, 4500],
    },
    "6m": {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      values: [3200, 3400, 3800, 4200, 4800, 5200],
    },
    "1y": {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      values: [
        3200, 3400, 3600, 4000, 4200, 4800, 5200, 5400, 5200, 5600, 6000, 6200,
      ],
    },
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        min: Math.min(...periodData[period].values) * 0.8,
        max: Math.max(...periodData[period].values) * 1.2,
        grid: {
          display: true,
          color: "rgba(229, 231, 235, 0.5)",
        },
        ticks: {
          // Include a dollar sign and format numbers
          callback: function (value) {
            if (value >= 1000) {
              return "$" + (value / 1000).toFixed(1) + "k";
            }
            return "$" + value;
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(17, 24, 39, 0.9)",
        padding: 12,
        bodyFont: {
          size: 12,
          family: "'Inter', sans-serif",
        },
        titleFont: {
          size: 13,
          family: "'Inter', sans-serif",
        },
        callbacks: {
          title: function (context) {
            return periodData[period].labels[context[0].dataIndex];
          },
          label: function (context) {
            const value = context.parsed.y;
            return `Balance: $${value.toLocaleString()}`;
          },
        },
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    elements: {
      point: {
        radius: 0,
        hoverRadius: 6,
        hitRadius: 6,
        backgroundColor: "#4F46E5",
        borderColor: "#fff",
        borderWidth: 2,
      },
      line: {
        tension: 0.3,
      },
    },
  };

  // Render period selection buttons only if fixedPeriod is false
  const renderPeriodButtons = () => {
    if (fixedPeriod) return null;

    return (
      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => setPeriod("1w")}
          className={`px-2 py-1 text-xs rounded-md ${
            period === "1w"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          1W
        </button>
        <button
          onClick={() => setPeriod("1m")}
          className={`px-2 py-1 text-xs rounded-md ${
            period === "1m"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          1M
        </button>
        <button
          onClick={() => setPeriod("6m")}
          className={`px-2 py-1 text-xs rounded-md ${
            period === "6m"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          6M
        </button>
        <button
          onClick={() => setPeriod("1y")}
          className={`px-2 py-1 text-xs rounded-md ${
            period === "1y"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          1Y
        </button>
      </div>
    );
  };

  // Data for the chart
  const data = {
    labels: periodData[period].labels,
    datasets: [
      {
        label: "Balance",
        data: periodData[period].values,
        fill: true,
        backgroundColor: "rgba(79, 70, 229, 0.2)",
        borderColor: "#4F46E5",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="flex flex-col h-full">
      {renderPeriodButtons()}
      <div className="flex-1">
        <Line ref={chartRef} options={options} data={data} />
      </div>
    </div>
  );
};

export default BalanceHistoryChart;
