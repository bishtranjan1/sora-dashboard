import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Spinner from "../ui/Spinner";
import {
  selectWeeklyActivity,
  selectWeeklyActivityLoading,
  selectWeeklyActivityError,
  fetchWeeklyActivity,
} from "../../store/slices/dashboardSlice";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const WeeklyActivityChart = ({ period = "This Week" }) => {
  const dispatch = useDispatch();

  // Get data from Redux store
  const weeklyActivity = useSelector(selectWeeklyActivity);
  const isLoading = useSelector(selectWeeklyActivityLoading);
  const error = useSelector(selectWeeklyActivityError);

  // Fetch data when component mounts
  useEffect(() => {
    if (!weeklyActivity || !weeklyActivity.chartData) {
      dispatch(fetchWeeklyActivity());
    }
  }, [dispatch, weeklyActivity]);

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
  if (!weeklyActivity || !weeklyActivity.chartData) {
    return (
      <div className="h-full w-full flex items-center justify-center text-gray-500">
        <p>No weekly activity data available</p>
      </div>
    );
  }

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        align: "end",
        labels: {
          boxWidth: 10,
          usePointStyle: true,
          pointStyle: "circle",
          padding: 15,
          font: {
            size: 11,
            family: "'Inter', sans-serif",
          },
        },
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
        usePointStyle: true,
        boxWidth: 8,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
            family: "'Inter', sans-serif",
          },
        },
      },
      y: {
        grid: {
          color: "rgba(243, 244, 246, 1)", // gray-100
        },
        border: {
          dash: [5, 5],
        },
        ticks: {
          font: {
            size: 11,
            family: "'Inter', sans-serif",
          },
          callback: function (value) {
            return "$" + value;
          },
        },
      },
    },
  };

  // Get chart data from Redux state
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const chartData = weeklyActivity.chartData || {};

  // Use current or last week data based on period prop
  const activityData =
    period === "Last Week"
      ? chartData.lastWeek || { deposits: [], withdrawals: [] }
      : chartData.currentWeek || { deposits: [], withdrawals: [] };

  const data = {
    labels,
    datasets: [
      {
        label: "Deposits",
        data: activityData.deposits,
        backgroundColor: "rgba(79, 70, 229, 0.8)", // primary color
        borderRadius: 6,
        borderSkipped: false,
        barPercentage: 0.5,
        categoryPercentage: 0.8,
      },
      {
        label: "Withdrawals",
        data: activityData.withdrawals,
        backgroundColor: "rgba(244, 63, 94, 0.8)", // secondary color
        borderRadius: 6,
        borderSkipped: false,
        barPercentage: 0.5,
        categoryPercentage: 0.8,
      },
    ],
  };

  return (
    <div className="h-full w-full flex items-center justify-center">
      <Bar options={options} data={data} height={null} width={null} />
    </div>
  );
};

export default WeeklyActivityChart;
