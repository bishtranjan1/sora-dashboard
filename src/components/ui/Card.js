import React from "react";

const Card = ({
  children,
  title,
  subtitle,
  action,
  className = "",
  headerClassName = "",
  bodyClassName = "",
  height = "320px", // Default fixed height
  scrollContent = false, // Whether content should scroll
}) => {
  return (
    <div className="flex flex-col h-full" style={{ height }}>
      {(title || subtitle || action) && (
        <div className={`px-2 mb-2 ${headerClassName}`}>
          <div className="flex items-center justify-between">
            <div>
              {title && (
                <h3 className="text-lg font-medium text-gray-800">{title}</h3>
              )}
              {subtitle && (
                <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
              )}
            </div>
            {action && <div>{action}</div>}
          </div>
        </div>
      )}

      <div
        className={`bg-white rounded-xl shadow-sm flex-grow flex flex-col ${className}`}
        style={{ height: "calc(100% - 30px)" }}
      >
        <div
          className={`p-6 h-full flex flex-col ${bodyClassName} ${
            scrollContent ? "overflow-y-auto" : "overflow-hidden"
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Card;
