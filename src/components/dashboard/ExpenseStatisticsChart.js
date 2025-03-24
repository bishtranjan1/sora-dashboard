import React, { useRef } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const ExpenseStatisticsChart = () => {
  const chartRef = useRef(null);

  // Define the expense data with specified percentages
  const expenseData = {
    labels: ["Entertainment", "Bill expense", "Investment", "Others"],
    percentages: [30, 15, 20, 35],
    colors: [
      "rgba(79, 70, 229, 1)", // primary (Entertainment)
      "rgba(244, 63, 94, 1)", // secondary (Bill expense)
      "rgba(16, 185, 129, 1)", // green-500 (Investment)
      "rgba(245, 158, 11, 1)", // yellow-500 (Others)
    ],
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
    <div className="h-full w-full">
      <Pie ref={chartRef} options={options} data={data} />
    </div>
  );
};

export default ExpenseStatisticsChart;
