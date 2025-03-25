import React from "react";

const Spinner = ({ size = "md", color = "primary" }) => {
  // Define size classes
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12",
  };

  // Define color classes
  const colorClasses = {
    primary: "border-indigo-600 border-t-transparent",
    secondary: "border-pink-500 border-t-transparent",
    gray: "border-gray-300 border-t-transparent",
    white: "border-white border-t-transparent",
  };

  // Get the correct classes based on props
  const spinnerSize = sizeClasses[size] || sizeClasses.md;
  const spinnerColor = colorClasses[color] || colorClasses.primary;

  return (
    <div
      className={`${spinnerSize} rounded-full border-4 ${spinnerColor} animate-spin`}
      role="status"
      aria-label="Loading"
    ></div>
  );
};

export default Spinner;
