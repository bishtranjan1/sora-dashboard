import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import {
  selectBalanceHistory,
  selectBalanceHistoryLoading,
  selectBalanceHistoryError,
  fetchBalanceHistory,
} from "../../store/slices/dashboardSlice";
import Spinner from "../ui/Spinner";

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
  const dispatch = useDispatch();

  // Get data from Redux store
  const balanceHistory = useSelector(selectBalanceHistory);
  const isLoading = useSelector(selectBalanceHistoryLoading);
  const error = useSelector(selectBalanceHistoryError);

  // Fetch data when component mounts or when period changes
  useEffect(() => {
    if (!balanceHistory || !balanceHistory.periodData) {
      dispatch(fetchBalanceHistory());
    }
  }, [dispatch, balanceHistory]);

  // Show loading spinner while data is being fetched
  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  // Show error message if data fetching failed
  if (error) {
    return (
      <div className="h-full w-full flex items-center justify-center text-red-500">
        <p>Error loading data: {error}</p>
      </div>
    );
  }

  // Show empty state if no data is available
  if (!balanceHistory || !balanceHistory.periodData) {
    return (
      <div className="h-full w-full flex items-center justify-center text-gray-500">
        <p>No balance history data available</p>
      </div>
    );
  }

  // Get period data from Redux store
  const periodData = balanceHistory.periodData || {};

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
        min: Math.min(...(periodData[period]?.values || [0])) * 0.8,
        max: Math.max(...(periodData[period]?.values || [100])) * 1.2,
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
            return periodData[period]?.labels[context[0].dataIndex] || "";
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
              ? "bg-black text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          1W
        </button>
        <button
          onClick={() => setPeriod("1m")}
          className={`px-2 py-1 text-xs rounded-md ${
            period === "1m"
              ? "bg-black text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          1M
        </button>
        <button
          onClick={() => setPeriod("6m")}
          className={`px-2 py-1 text-xs rounded-md ${
            period === "6m"
              ? "bg-black text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          6M
        </button>
        <button
          onClick={() => setPeriod("1y")}
          className={`px-2 py-1 text-xs rounded-md ${
            period === "1y"
              ? "bg-black text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          1Y
        </button>
      </div>
    );
  };

  // Data for the chart from Redux
  const chartData = {
    labels: periodData[period]?.labels || [],
    datasets: [
      {
        label: "Balance",
        data: periodData[period]?.values || [],
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
        <Line ref={chartRef} options={options} data={chartData} />
      </div>
    </div>
  );
};

export default BalanceHistoryChart;
