import React from "react";

const CardSkeleton = () => {
  return (
    <div
      className="relative rounded-xl overflow-hidden p-5 flex flex-col justify-between
        bg-gray-200 animate-pulse
        cursor-pointer transition-all duration-300"
      style={{
        height: "180px",
        width: "300px",
        flexShrink: 0,
      }}
    >
      {/* Top section - Balance */}
      <div className="relative z-10">
        <div className="h-3 w-16 bg-gray-300 rounded mb-2"></div>
        <div className="h-6 w-32 bg-gray-300 rounded"></div>
      </div>

      {/* Middle section - Card Holder and Valid Thru */}
      <div className="flex justify-between items-center relative z-10">
        <div>
          <div className="h-2 w-16 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 w-24 bg-gray-300 rounded"></div>
        </div>
        <div>
          <div className="h-2 w-16 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 w-16 bg-gray-300 rounded"></div>
        </div>
      </div>

      {/* Bottom section - Card Number and Logo */}
      <div className="flex justify-between items-end relative z-10">
        <div className="h-3 w-40 bg-gray-300 rounded"></div>
        <div className="h-6 w-10 bg-gray-300 rounded"></div>
      </div>

      {/* Card chip element */}
      <div className="absolute right-5 top-8 w-7 h-7 rounded-md bg-gray-300 z-10"></div>
    </div>
  );
};

export default CardSkeleton;
