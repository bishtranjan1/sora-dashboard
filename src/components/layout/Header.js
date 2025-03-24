import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Function to get page title based on current path
  const getPageTitle = () => {
    const path = location.pathname.substring(1);

    switch (path) {
      case "":
        return "Overview";
      case "transactions":
        return "Transactions";
      case "accounts":
        return "Accounts";
      case "investments":
        return "Investment Portfolio";
      case "credit-cards":
        return "Credit Cards";
      case "loans":
        return "Loan Management";
      case "services":
        return "Banking Services";
      case "privileges":
        return "Premium Privileges";
      case "settings":
        return "Account Settings";
      default:
        return "Overview";
    }
  };

  // Function to navigate to settings page
  const goToSettings = () => {
    navigate("/settings");
  };

  return (
    <header
      className="bg-white h-16 flex items-center justify-between px-6 shadow-sm fixed top-0 right-0 left-0 lg:left-64 transition-all"
      style={{ zIndex: 20 }}
    >
      <div className="flex items-center">
        {/* Space for hamburger menu on mobile */}
        <div className="w-14 lg:hidden"></div>
        <h2 className="text-xl font-bold text-gray-800 lg:ml-0">
          {getPageTitle()}
        </h2>
      </div>

      <div className="flex items-center space-x-5">
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-100 rounded-lg pl-10 pr-4 py-2 w-60 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          />
          <span className="absolute left-3 top-2.5 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
        </div>

        <div
          className="relative cursor-pointer hover:text-primary transition-colors"
          onClick={goToSettings}
          title="Settings"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-500 hover:text-primary transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>

        <div className="relative cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            5
          </span>
        </div>

        <button className="md:hidden relative cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>

        <div className="border-l border-gray-200 h-8 mx-2 hidden sm:block"></div>

        <div className="flex items-center cursor-pointer">
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white">
            <span className="text-sm">JD</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
