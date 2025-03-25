import React, { useState } from "react";
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

const RecentTransactions = () => {
  const [transactions] = useState(SAMPLE_TRANSACTIONS);

  const getTransactionIcon = (type) => {
    switch (type) {
      case "income":
        return (
          <div className="rounded-full p-2 bg-green-100">
            <ArrowTrendingUpIcon className="h-5 w-5 text-green-600" />
          </div>
        );
      case "expense":
        return (
          <div className="rounded-full p-2 bg-red-100">
            <ArrowTrendingDownIcon className="h-5 w-5 text-red-600" />
          </div>
        );
      case "transfer":
        return (
          <div className="rounded-full p-2 bg-blue-100">
            <ArrowPathIcon className="h-5 w-5 text-blue-600" />
          </div>
        );
      default:
        return null;
    }
  };

  const formatAmount = (amount, type) => {
    const formattedAmount = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(Math.abs(amount));

    if (type === "income") {
      return <span className="text-green-600">+{formattedAmount}</span>;
    } else if (type === "expense") {
      return <span className="text-red-600">-{formattedAmount}</span>;
    }
    return <span>{formattedAmount}</span>;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(date);
  };

  return (
    <div className="w-full h-full">
      <div
        className="h-full overflow-y-auto pr-2"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#D1D5DB transparent",
        }}
      >
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center p-3 bg-white rounded-xl hover:bg-gray-50 transition-colors duration-150"
            >
              <div className="flex-shrink-0 mr-3">
                {getTransactionIcon(transaction.type)}
              </div>
              <div className="flex-grow mr-3">
                <p className="font-medium text-gray-900">
                  {transaction.description}
                </p>
                <p className="text-sm text-gray-500">
                  {formatDate(transaction.date)}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">
                  {formatAmount(transaction.amount, transaction.type)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Sample transaction data
const SAMPLE_TRANSACTIONS = [
  {
    id: 1,
    description: "Salary Deposit",
    amount: 2850.0,
    date: "2023-07-01",
    category: "Income",
    type: "income",
  },
  {
    id: 2,
    description: "Apartment Rent",
    amount: -1400.0,
    date: "2023-07-03",
    category: "Housing",
    type: "expense",
  },
  {
    id: 3,
    description: "Grocery Shopping",
    amount: -120.5,
    date: "2023-07-05",
    category: "Groceries",
    type: "expense",
  },
  {
    id: 4,
    description: "Freelance Payment",
    amount: 450.0,
    date: "2023-07-07",
    category: "Income",
    type: "income",
  },
  {
    id: 5,
    description: "Transfer to Savings",
    amount: -500.0,
    date: "2023-07-10",
    category: "Transfer",
    type: "transfer",
  },
  {
    id: 6,
    description: "Coffee Subscription",
    amount: -25.0,
    date: "2023-07-12",
    category: "Food & Drink",
    type: "expense",
  },
  {
    id: 7,
    description: "Online Course",
    amount: -199.99,
    date: "2023-07-15",
    category: "Education",
    type: "expense",
  },
  {
    id: 8,
    description: "Dividend Payment",
    amount: 87.33,
    date: "2023-07-18",
    category: "Investment",
    type: "income",
  },
];

export default RecentTransactions;
