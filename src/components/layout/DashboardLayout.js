import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="w-full lg:ml-64 flex-1 transition-all">
        <Header />

        <main className="pt-24 px-4 sm:px-6 md:px-8 pb-8 relative z-0">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
