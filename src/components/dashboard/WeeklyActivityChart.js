import React from "react";
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

  // Sample data - adjust based on the period
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Generate weekly data based on period
  const generateData = () => {
    if (period === "Last Week") {
      return {
        deposits: [720, 820, 950, 990, 1200, 420, 350],
        withdrawals: [570, 620, 780, 520, 450, 650, 220],
      };
    }

    // Default to "This Week"
    return {
      deposits: [820, 950, 1100, 880, 1400, 780, 650],
      withdrawals: [650, 720, 880, 720, 650, 580, 350],
    };
  };

  const activityData = generateData();

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
    <div className="h-full w-full">
      <Bar options={options} data={data} height={null} width={null} />
    </div>
  );
};

export default WeeklyActivityChart;
