import React from "react";

const StatCard = ({ title, value, change, icon, color }) => {
  const isPositive = change.startsWith("+");

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-all">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-600 font-medium text-sm">{title}</h3>
        <div
          className={`${color} w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-sm`}
        >
          {typeof icon === "string" ? (
            <span className="text-lg">{icon}</span>
          ) : (
            icon
          )}
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
          <div className="flex items-center mt-2">
            <span
              className={`text-xs font-medium px-2 py-1 rounded-full flex items-center mr-2 ${
                isPositive
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {isPositive ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 mr-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 mr-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              )}
              {change}
            </span>
            <span className="text-xs text-gray-500">this month</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
