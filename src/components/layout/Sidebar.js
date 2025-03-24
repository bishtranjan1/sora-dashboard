import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState("dashboard");
  const [isOpen, setIsOpen] = useState(false);

  // Set active item based on current path
  useEffect(() => {
    // Remove leading slash and set active item
    const path = location.pathname.substring(1) || "dashboard";
    setActiveItem(path);
  }, [location]);

  // Close sidebar on screen resize to larger screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.getElementById("mobile-sidebar");
      const hamburger = document.getElementById("hamburger-button");

      if (
        isOpen &&
        sidebar &&
        !sidebar.contains(event.target) &&
        hamburger &&
        !hamburger.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Toggle body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊", path: "/" },
    {
      id: "transactions",
      label: "Transactions",
      icon: "💸",
      path: "/transactions",
    },
    { id: "accounts", label: "Accounts", icon: "💼", path: "/accounts" },
    {
      id: "investments",
      label: "Investments",
      icon: "📈",
      path: "/investments",
    },
    {
      id: "credit-cards",
      label: "Credit Cards",
      icon: "💳",
      path: "/credit-cards",
    },
    { id: "loans", label: "Loans", icon: "🏦", path: "/loans" },
    { id: "services", label: "Services", icon: "🔧", path: "/services" },
    {
      id: "privileges",
      label: "My Privileges",
      icon: "🌟",
      path: "/privileges",
    },
    { id: "settings", label: "Settings", icon: "⚙️", path: "/settings" },
  ];

  // Hamburger button for mobile
  const HamburgerButton = () => (
    <button
      id="hamburger-button"
      onClick={() => setIsOpen(!isOpen)}
      style={{ zIndex: 1000 }}
      className="lg:hidden fixed top-4 left-4 p-2 rounded-lg bg-white shadow-sm focus:outline-none"
      aria-label="Toggle menu"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-gray-800"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
  );

  return (
    <>
      <HamburgerButton />

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar for desktop */}
      <div className="hidden lg:flex bg-white text-gray-800 w-64 h-screen p-6 fixed left-0 top-0 flex-col shadow-md z-30">
        <div className="flex items-center mb-10">
          <div className="bg-primary rounded-lg p-2 mr-3">
            <span className="text-xl">💹</span>
          </div>
          <h1 className="text-xl font-bold">Soar Task</h1>
        </div>

        <nav className="flex-1 -mx-6">
          <ul className="space-y-1 w-full">
            {menuItems.map((item) => (
              <li
                key={item.id}
                className={`${
                  activeItem === item.id ? "border-l-4 border-black" : ""
                } px-6`}
              >
                <Link
                  to={item.path}
                  className={`flex items-center p-3 rounded-lg transition-colors w-full ${
                    activeItem === item.id
                      ? "text-black font-semibold pl-2"
                      : "text-gray-400 hover:text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span
                    className={`mr-3 text-xl ${
                      activeItem !== item.id && "text-gray-400"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Mobile sidebar */}
      <div
        id="mobile-sidebar"
        style={{ zIndex: 999 }}
        className={`lg:hidden fixed top-0 left-0 bg-white text-gray-800 w-64 h-screen p-6 transform transition-transform duration-300 ease-in-out shadow-xl ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className="bg-primary rounded-lg p-2 mr-3">
              <span className="text-xl">💹</span>
            </div>
            <h1 className="text-xl font-bold">Soar Task</h1>
          </div>
          <button
            className="text-gray-600"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="flex-1 -mx-6">
          <ul className="space-y-1 w-full">
            {menuItems.map((item) => (
              <li
                key={item.id}
                className={`${
                  activeItem === item.id ? "border-l-4 border-black" : ""
                } px-6`}
              >
                <Link
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center p-3 rounded-lg transition-colors w-full ${
                    activeItem === item.id
                      ? "text-black font-semibold pl-2"
                      : "text-gray-400 hover:text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span
                    className={`mr-3 text-xl ${
                      activeItem !== item.id && "text-gray-400"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
