import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  selectExpenseStatistics,
  selectExpenseStatisticsLoading,
  selectExpenseStatisticsError,
  fetchExpenseStatistics,
} from "../../store/slices/dashboardSlice";
import Spinner from "../ui/Spinner";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const ExpenseStatisticsChart = () => {
  const chartRef = useRef(null);
  const dispatch = useDispatch();

  // Get data from Redux store
  const expenseStatistics = useSelector(selectExpenseStatistics);
  const isLoading = useSelector(selectExpenseStatisticsLoading);
  const error = useSelector(selectExpenseStatisticsError);

  // Fetch data when component mounts
  useEffect(() => {
    if (!expenseStatistics || !expenseStatistics.categories) {
      dispatch(fetchExpenseStatistics());
    }
  }, [dispatch, expenseStatistics]);

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
  if (
    !expenseStatistics ||
    !expenseStatistics.categories ||
    expenseStatistics.categories.length === 0
  ) {
    return (
      <div className="h-full w-full flex items-center justify-center text-gray-500">
        <p>No expense statistics data available</p>
      </div>
    );
  }

  // Process data from Redux store
  const categories = expenseStatistics.categories || [];
  const expenseData = {
    labels: categories.map((category) => category.name),
    percentages: categories.map((category) => category.percentage),
    colors: categories.map((category) => category.color),
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide legend since we're using datalabels
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
          label: function (context) {
            const label = context.label || "";
            const percentage = context.parsed || 0;
            return `${label}: ${percentage}%`;
          },
        },
      },
      // Add datalabels plugin configuration
      datalabels: {
        color: "#fff",
        font: {
          weight: "bold",
          size: 12,
        },
        formatter: (value, ctx) => {
          if (!ctx.chart.data.labels) return "";
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return `${label}\n${value}%`;
        },
        padding: 6,
        align: "center",
        anchor: "center",
        rotation: function (ctx) {
          if (!ctx.chart.getDatasetMeta(0).data[ctx.dataIndex]) return 0;
          const angle =
            ctx.chart.getDatasetMeta(0).data[ctx.dataIndex].startAngle +
            (ctx.chart.getDatasetMeta(0).data[ctx.dataIndex].endAngle -
              ctx.chart.getDatasetMeta(0).data[ctx.dataIndex].startAngle) /
              2;
          return angle > Math.PI / 2 && angle < Math.PI * 1.5
            ? angle - Math.PI
            : angle;
        },
      },
    },
    borderWidth: 0,
  };

  // Chart data
  const data = {
    labels: expenseData.labels,
    datasets: [
      {
        data: expenseData.percentages,
        backgroundColor: expenseData.colors,
        borderWidth: 0,
        hoverOffset: 5,
      },
    ],
  };

  return (
    <div className="h-full w-full flex items-center justify-center">
      <Pie ref={chartRef} options={options} data={data} />
    </div>
  );
};

export default ExpenseStatisticsChart;
