import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Icon from "../../utils/icons";

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
        return "Investments";
      case "credit-cards":
        return "Credit Cards";
      case "loans":
        return "Loans";
      case "services":
        return "Services";
      case "privileges":
        return "Privileges";
      case "settings":
        return "Settings";
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
            <Icon name="search" size={20} />
          </span>
        </div>

        <div
          className="relative cursor-pointer hover:text-primary transition-colors"
          onClick={goToSettings}
          title="Settings"
        >
          <Icon
            name="settings"
            size={24}
            className="text-gray-500 hover:text-primary transition-colors"
          />
        </div>

        <div className="relative cursor-pointer">
          <Icon name="notification" size={24} className="text-gray-500" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            5
          </span>
        </div>

        <button className="md:hidden relative cursor-pointer">
          <Icon name="search" size={24} className="text-gray-500" />
        </button>

        <div className="border-l border-gray-200 h-8 mx-2 hidden sm:block"></div>

        <div className="flex items-center cursor-pointer">
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white">
            <span className="text-sm">RB</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
