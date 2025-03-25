import React, { lazy, Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import Card from "../components/ui/Card";
import Spinner from "../components/ui/Spinner";
import { Link } from "react-router-dom";
import { fetchAllDashboardData } from "../store/slices/dashboardSlice";

// Lazy load all dashboard components
const MyCards = lazy(() => import("../components/dashboard/MyCards"));
const RecentTransactions = lazy(() =>
  import("../components/dashboard/RecentTransactions")
);
const WeeklyActivityChart = lazy(() =>
  import("../components/dashboard/WeeklyActivityChart")
);
const ExpenseStatisticsChart = lazy(() =>
  import("../components/dashboard/ExpenseStatisticsChart")
);
const QuickTransfer = lazy(() =>
  import("../components/dashboard/QuickTransfer")
);
const BalanceHistoryChart = lazy(() =>
  import("../components/dashboard/BalanceHistoryChart")
);

// Spinner loader component for Suspense fallback
const ComponentLoader = () => (
  <div className="h-full w-full flex items-center justify-center">
    <Spinner size="lg" color="primary" />
  </div>
);  

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
            <Suspense fallback={<ComponentLoader />}>
              <MyCards />
            </Suspense>
          </Card>
        </div>
        <div className="w-full lg:w-1/3">
          <Card
            title="Recent Transactions"
            className="h-full"
            height={{ default: "auto", lg: rowHeight }}
            scrollContent={true} // Enable vertical scrolling
          >
            <Suspense fallback={<ComponentLoader />}>
              <RecentTransactions />
            </Suspense>
          </Card>
        </div>
      </div>

      {/* Second Row: Weekly Activity and Expense Statistics */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-2/3">
          <Card title="Weekly Activity" className="h-full" height={rowHeight}>
            <Suspense fallback={<ComponentLoader />}>
              <WeeklyActivityChart period="This Week" />
            </Suspense>
          </Card>
        </div>
        <div className="w-full lg:w-1/3">
          <Card
            title="Expense Statistics"
            className="h-full"
            height={rowHeight}
          >
            <Suspense fallback={<ComponentLoader />}>
              <ExpenseStatisticsChart />
            </Suspense>
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
            <Suspense fallback={<ComponentLoader />}>
              <QuickTransfer />
            </Suspense>
          </Card>
        </div>
        <div className="w-full lg:w-2/3">
          <Card title="Balance History" className="h-full" height={rowHeight}>
            <Suspense fallback={<ComponentLoader />}>
              <BalanceHistoryChart initialPeriod="1y" fixedPeriod={true} />
            </Suspense>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
