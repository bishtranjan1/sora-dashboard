import React from "react";
import Card from "../components/ui/Card";
import BalanceHistoryChart from "../components/dashboard/BalanceHistoryChart";
import ExpenseStatisticsChart from "../components/dashboard/ExpenseStatisticsChart";
import MyCards from "../components/dashboard/MyCards";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import WeeklyActivityChart from "../components/dashboard/WeeklyActivityChart";
import QuickTransfer from "../components/dashboard/QuickTransfer";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const seeAllAction = (
    <Link
      to="/credit-cards"
      className="text-sm text-blue-600 hover:text-blue-800 font-medium"
    >
      See All
    </Link>
  );

  return (
    <div className="space-y-6">
      {/* First Row: My Cards and Recent Transactions */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-2/3">
          <Card title="My Cards" className="h-full" action={seeAllAction}>
            <MyCards />
          </Card>
        </div>
        <div className="w-full lg:w-1/3">
          <Card title="Recent Transactions" className="h-full">
            <RecentTransactions />
          </Card>
        </div>
      </div>

      {/* Second Row: Weekly Activity and Expense Statistics */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-2/3">
          <Card title="Weekly Activity" className="h-full">
            <WeeklyActivityChart period="This Week" />
          </Card>
        </div>
        <div className="w-full lg:w-1/3">
          <Card title="Expense Statistics" className="h-full">
            <ExpenseStatisticsChart />
          </Card>
        </div>
      </div>

      {/* Third Row: Quick Transfer and Balance History */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/3">
          <Card title="Quick Transfer" className="h-full">
            <QuickTransfer />
          </Card>
        </div>
        <div className="w-full lg:w-2/3">
          <Card title="Balance History" className="h-full">
            <BalanceHistoryChart initialPeriod="1y" fixedPeriod={true} />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
