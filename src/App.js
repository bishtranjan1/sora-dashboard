import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import TransactionsPage from "./pages/Transactions";
import AccountsPage from "./pages/Accounts";
import InvestmentsPage from "./pages/Investments";
import CreditCardsPage from "./pages/CreditCards";
import LoansPage from "./pages/Loans";
import ServicesPage from "./pages/Services";
import PrivilegesPage from "./pages/Privileges";
import SettingsPage from "./pages/Settings";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          }
        />
        <Route
          path="/transactions"
          element={
            <DashboardLayout>
              <TransactionsPage />
            </DashboardLayout>
          }
        />
        <Route
          path="/accounts"
          element={
            <DashboardLayout>
              <AccountsPage />
            </DashboardLayout>
          }
        />
        <Route
          path="/investments"
          element={
            <DashboardLayout>
              <InvestmentsPage />
            </DashboardLayout>
          }
        />
        <Route
          path="/credit-cards"
          element={
            <DashboardLayout>
              <CreditCardsPage />
            </DashboardLayout>
          }
        />
        <Route
          path="/loans"
          element={
            <DashboardLayout>
              <LoansPage />
            </DashboardLayout>
          }
        />
        <Route
          path="/services"
          element={
            <DashboardLayout>
              <ServicesPage />
            </DashboardLayout>
          }
        />
        <Route
          path="/privileges"
          element={
            <DashboardLayout>
              <PrivilegesPage />
            </DashboardLayout>
          }
        />
        <Route
          path="/settings"
          element={
            <DashboardLayout>
              <SettingsPage />
            </DashboardLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
