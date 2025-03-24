import React from "react";

const TestComponent = () => {
  return (
    <div className="p-4 m-4 bg-white rounded shadow">
      <h2 className="text-lg font-bold text-primary mb-4">
        Styling Test Component
      </h2>
      <p className="text-gray-700 mb-2">
        This component tests whether Tailwind CSS styling is working properly.
      </p>
      <div className="flex justify-between items-center mt-4">
        <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark">
          Primary Button
        </button>
        <button className="bg-secondary text-white px-4 py-2 rounded hover:bg-secondary-dark">
          Secondary Button
        </button>
      </div>
    </div>
  );
};

export default TestComponent;
