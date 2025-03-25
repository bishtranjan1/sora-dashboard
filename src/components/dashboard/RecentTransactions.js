import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import {
  selectTransactions,
  selectTransactionsLoading,
  selectTransactionsError,
  fetchTransactions,
} from "../../store/slices/dashboardSlice";
import Spinner from "../ui/Spinner";

const RecentTransactions = () => {
  const dispatch = useDispatch();
  const transactions = useSelector(selectTransactions);
  const isLoading = useSelector(selectTransactionsLoading);
  const error = useSelector(selectTransactionsError);

  // Fetch transactions data on component mount
  useEffect(() => {
    if (!transactions || transactions.length === 0) {
      dispatch(fetchTransactions());
    }
  }, [dispatch, transactions]);

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

  // Show loading state
  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  // Show empty state
  if (!transactions || transactions.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-gray-500">No transactions available.</div>
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="space-y-3">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center p-2.5">
            <div className="flex-shrink-0 mr-3">
              {getTransactionIcon(transaction.type)}
            </div>
            <div className="flex-grow mr-3">
              <p className="font-medium text-gray-900 text-sm">
                {transaction.description}
              </p>
              <p className="text-xs text-gray-500">
                {formatDate(transaction.date)}
              </p>
            </div>
            <div className="text-right">
              <p className="font-medium text-sm">
                {formatAmount(transaction.amount, transaction.type)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
