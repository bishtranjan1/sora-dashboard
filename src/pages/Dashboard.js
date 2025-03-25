import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Card from "../components/ui/Card";
import BalanceHistoryChart from "../components/dashboard/BalanceHistoryChart";
import ExpenseStatisticsChart from "../components/dashboard/ExpenseStatisticsChart";
import MyCards from "../components/dashboard/MyCards";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import WeeklyActivityChart from "../components/dashboard/WeeklyActivityChart";
import QuickTransfer from "../components/dashboard/QuickTransfer";
import { Link } from "react-router-dom";
import { fetchAllDashboardData } from "../store/slices/dashboardSlice";

const Dashboard = () => {
  const dispatch = useDispatch();

  // Fetch all dashboard data on component mount
  useEffect(() => {
    dispatch(fetchAllDashboardData());
  }, [dispatch]);

  const seeAllAction = (
    <Link
      to="/credit-cards"
      className="text-sm text-blue-600 hover:text-blue-800 font-medium"
    >
      See All
    </Link>
  );

  // Set consistent heights for each row on desktop
  const rowHeight = "320px";

  return (
    <div className="space-y-6">
      {/* First Row: My Cards and Recent Transactions */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-2/3">
          <Card
            title="My Cards"
            className="h-full"
            action={seeAllAction}
            height={rowHeight}
          >
            <MyCards />
          </Card>
        </div>
        <div className="w-full lg:w-1/3">
          <Card
            title="Recent Transactions"
            className="h-full"
            height={{ default: "auto", lg: rowHeight }}
            scrollContent={true} // Enable vertical scrolling
          >
            <RecentTransactions />
          </Card>
        </div>
      </div>

      {/* Second Row: Weekly Activity and Expense Statistics */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-2/3">
          <Card title="Weekly Activity" className="h-full" height={rowHeight}>
            <WeeklyActivityChart period="This Week" />
          </Card>
        </div>
        <div className="w-full lg:w-1/3">
          <Card
            title="Expense Statistics"
            className="h-full"
            height={rowHeight}
          >
            <ExpenseStatisticsChart />
          </Card>
        </div>
      </div>

      {/* Third Row: Quick Transfer and Balance History */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/3">
          <Card
            title="Quick Transfer"
            className="h-full"
            height={{ default: "auto", lg: rowHeight }}
            scrollContent={true} // Enable vertical scrolling for overflow content
          >
            <QuickTransfer />
          </Card>
        </div>
        <div className="w-full lg:w-2/3">
          <Card title="Balance History" className="h-full" height={rowHeight}>
            <BalanceHistoryChart initialPeriod="1y" fixedPeriod={true} />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
