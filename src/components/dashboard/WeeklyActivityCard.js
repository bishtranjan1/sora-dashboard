import React from "react";
import { useSelector } from "react-redux";
import { selectWeeklyActivity } from "../../store/slices/dashboardSlice";

const WeeklyActivityCard = () => {
  const weeklyActivity = useSelector(selectWeeklyActivity);
  const { totalTransactions, changePercentage, data, categories } =
    weeklyActivity;

  // Find the maximum value for scaling
  const maxValue = Math.max(...data.map((item) => item.value));

  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Weekly Activity</h3>
        <div className="flex items-center text-sm">
          <span
            className={`font-medium ${
              changePercentage >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {changePercentage >= 0 ? "+" : ""}
            {changePercentage}%
          </span>
          <span className="text-gray-500 ml-2">vs last week</span>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-sm text-gray-500 mb-1">Total Transactions</p>
        <p className="text-2xl font-bold text-gray-800">{totalTransactions}</p>
      </div>

      {/* Activity Bar Chart */}
      <div className="flex items-end justify-between h-28 mb-6">
        {data.map((item, index) => {
          const height = (item.value / maxValue) * 100;
          return (
            <div key={index} className="flex flex-col items-center w-1/7">
              <div
                className="w-6 rounded-t-md bg-primary bg-opacity-80 hover:bg-opacity-100 transition-all cursor-pointer"
                style={{ height: `${height}%` }}
                title={`${item.day}: ${item.value} transactions`}
              ></div>
              <span className="text-xs text-gray-500 mt-2">{item.day}</span>
            </div>
          );
        })}
      </div>

      {/* Categories */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Categories</h4>
        <div className="space-y-2">
          {categories.map((category, index) => (
            <div key={index} className="flex flex-col">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-500">{category.name}</span>
                <span className="text-xs font-medium text-gray-700">
                  {category.percentage}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`${category.color} h-2 rounded-full`}
                  style={{ width: `${category.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeeklyActivityCard;
