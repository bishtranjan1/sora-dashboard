import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCardsData,
  fetchTransactionsData,
  fetchWeeklyActivityData,
  fetchExpenseStatisticsData,
  fetchQuickTransferData,
  fetchBalanceHistoryData,
} from "../../services/api";

const initialState = {
  balance: {
    total: 25890.5,
    currency: "USD",
    change: 2.5,
    chartData: [5, 10, 5, 20, 8, 15, 22, 30, 25, 28],
  },
  cards: [
    {
      id: "card-1",
      type: "Visa",
      number: "**** **** **** 4585",
      expiryDate: "09/24",
      balance: 2850.75,
      currency: "USD",
      color: "from-blue-400 to-blue-600",
    },
    {
      id: "card-2",
      type: "Mastercard",
      number: "**** **** **** 6789",
      expiryDate: "12/25",
      balance: 4250.25,
      currency: "USD",
      color: "from-purple-400 to-purple-600",
    },
  ],
  transactions: [
    {
      id: "tx-1",
      title: "Netflix Subscription",
      amount: -12.99,
      date: "2023-09-18T10:30:00Z",
      category: "Entertainment",
      icon: "🎬",
    },
    {
      id: "tx-2",
      title: "Salary Deposit",
      amount: 4500.0,
      date: "2023-09-15T09:15:00Z",
      category: "Income",
      icon: "💰",
    },
    {
      id: "tx-3",
      title: "Grocery Shopping",
      amount: -85.43,
      date: "2023-09-17T15:20:00Z",
      category: "Groceries",
      icon: "🛒",
    },
    {
      id: "tx-4",
      title: "Freelance Payment",
      amount: 950.0,
      date: "2023-09-14T11:45:00Z",
      category: "Income",
      icon: "💻",
    },
    {
      id: "tx-5",
      title: "Restaurant Bill",
      amount: -68.5,
      date: "2023-09-16T19:30:00Z",
      category: "Dining",
      icon: "🍽️",
    },
  ],
  investments: {
    total: 12580.25,
    change: 3.8,
    chartData: [10, 15, 12, 18, 22, 16, 20, 25, 23, 28],
    assets: [
      {
        name: "Stocks",
        value: 7250.5,
        change: 4.2,
        color: "from-green-400 to-green-600",
      },
      {
        name: "Crypto",
        value: 3200.75,
        change: -2.1,
        color: "from-yellow-400 to-yellow-600",
      },
      {
        name: "Bonds",
        value: 2129.0,
        change: 1.5,
        color: "from-blue-400 to-blue-600",
      },
    ],
  },
  weeklyActivity: {
    totalTransactions: 28,
    changePercentage: 12.5,
    data: [
      { day: "Mon", value: 12 },
      { day: "Tue", value: 8 },
      { day: "Wed", value: 15 },
      { day: "Thu", value: 10 },
      { day: "Fri", value: 20 },
      { day: "Sat", value: 18 },
      { day: "Sun", value: 5 },
    ],
    categories: [
      { name: "Shopping", percentage: 35, color: "bg-blue-500" },
      { name: "Food", percentage: 25, color: "bg-purple-500" },
      { name: "Entertainment", percentage: 20, color: "bg-yellow-500" },
      { name: "Transport", percentage: 15, color: "bg-green-500" },
      { name: "Other", percentage: 5, color: "bg-gray-500" },
    ],
  },
  quickTransfer: {
    recentRecipients: [
      {
        id: "user1",
        name: "Sarah Johnson",
        avatar: null,
        email: "sarah.j@example.com",
      },
      {
        id: "user2",
        name: "Michael Brown",
        avatar: null,
        email: "michael.b@example.com",
      },
      {
        id: "user3",
        name: "Emily Davis",
        avatar: null,
        email: "emily.d@example.com",
      },
      {
        id: "user4",
        name: "Robert Wilson",
        avatar: null,
        email: "robert.w@example.com",
      },
    ],
    savedAccounts: [
      {
        id: "acc1",
        name: "Sarah Johnson",
        bank: "Chase",
        accountNumber: "****5678",
        avatar: null,
      },
      {
        id: "acc2",
        name: "Michael Brown",
        bank: "Bank of America",
        accountNumber: "****4321",
        avatar: null,
      },
      {
        id: "acc3",
        name: "Emily Davis",
        bank: "Wells Fargo",
        accountNumber: "****9876",
        avatar: null,
      },
    ],
    transferLimits: {
      daily: 5000,
      monthly: 50000,
      remaining: {
        daily: 3250,
        monthly: 32500,
      },
    },
  },
  expenseStatistics: {
    totalExpenses: 3250.75,
    changePercentage: 8.5,
    currency: "USD",
    categories: [
      { name: "Housing", percentage: 35, color: "#4C51BF" },
      { name: "Food", percentage: 25, color: "#38B2AC" },
      { name: "Transportation", percentage: 15, color: "#ED8936" },
      { name: "Entertainment", percentage: 10, color: "#9F7AEA" },
      { name: "Other", percentage: 15, color: "#718096" },
    ],
  },
  balanceHistory: {
    currentBalance: 6200,
    changePercentage: 12.5,
    currency: "USD",
    periodData: {
      "1w": {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        values: [3200, 3400, 3300, 5200, 4800, 4000, 4500],
      },
    },
  },
  isLoading: {
    cards: false,
    transactions: false,
    weeklyActivity: false,
    expenseStatistics: false,
    quickTransfer: false,
    balanceHistory: false,
  },
  error: {
    cards: null,
    transactions: null,
    weeklyActivity: null,
    expenseStatistics: null,
    quickTransfer: null,
    balanceHistory: null,
  },
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    updateBalance: (state, action) => {
      state.balance = { ...state.balance, ...action.payload };
    },
    addCard: (state, action) => {
      state.cards.push(action.payload);
    },
    updateCard: (state, action) => {
      const index = state.cards.findIndex(
        (card) => card.id === action.payload.id
      );
      if (index !== -1) {
        state.cards[index] = { ...state.cards[index], ...action.payload };
      }
    },
    removeCard: (state, action) => {
      state.cards = state.cards.filter((card) => card.id !== action.payload);
    },
    addTransaction: (state, action) => {
      state.transactions.unshift(action.payload);
    },
    updateInvestments: (state, action) => {
      state.investments = { ...state.investments, ...action.payload };
    },
    updateWeeklyActivity: (state, action) => {
      state.weeklyActivity = { ...state.weeklyActivity, ...action.payload };
    },
    updateActivityCategories: (state, action) => {
      state.weeklyActivity.categories = action.payload;
    },
    addRecentRecipient: (state, action) => {
      // Check if recipient already exists
      const existingIndex = state.quickTransfer.recentRecipients.findIndex(
        (recipient) => recipient.id === action.payload.id
      );

      if (existingIndex !== -1) {
        // Move to the top if exists
        const [recipient] = state.quickTransfer.recentRecipients.splice(
          existingIndex,
          1
        );
        state.quickTransfer.recentRecipients.unshift(recipient);
      } else {
        // Add new recipient at the top
        state.quickTransfer.recentRecipients.unshift(action.payload);
        // Keep only the last 10 recipients
        if (state.quickTransfer.recentRecipients.length > 10) {
          state.quickTransfer.recentRecipients.pop();
        }
      }
    },
    addSavedAccount: (state, action) => {
      state.quickTransfer.savedAccounts.push(action.payload);
    },
    removeSavedAccount: (state, action) => {
      state.quickTransfer.savedAccounts =
        state.quickTransfer.savedAccounts.filter(
          (account) => account.id !== action.payload
        );
    },
    updateTransferLimits: (state, action) => {
      state.quickTransfer.transferLimits = {
        ...state.quickTransfer.transferLimits,
        ...action.payload,
      };
    },
    // New actions for setting loading state for specific data types
    setCardsLoading: (state, action) => {
      state.isLoading.cards = action.payload;
    },
    setTransactionsLoading: (state, action) => {
      state.isLoading.transactions = action.payload;
    },
    setWeeklyActivityLoading: (state, action) => {
      state.isLoading.weeklyActivity = action.payload;
    },
    setExpenseStatisticsLoading: (state, action) => {
      state.isLoading.expenseStatistics = action.payload;
    },
    setQuickTransferLoading: (state, action) => {
      state.isLoading.quickTransfer = action.payload;
    },
    setBalanceHistoryLoading: (state, action) => {
      state.isLoading.balanceHistory = action.payload;
    },
    // New actions for setting error state for specific data types
    setCardsError: (state, action) => {
      state.error.cards = action.payload;
      state.isLoading.cards = false;
    },
    setTransactionsError: (state, action) => {
      state.error.transactions = action.payload;
      state.isLoading.transactions = false;
    },
    setWeeklyActivityError: (state, action) => {
      state.error.weeklyActivity = action.payload;
      state.isLoading.weeklyActivity = false;
    },
    setExpenseStatisticsError: (state, action) => {
      state.error.expenseStatistics = action.payload;
      state.isLoading.expenseStatistics = false;
    },
    setQuickTransferError: (state, action) => {
      state.error.quickTransfer = action.payload;
      state.isLoading.quickTransfer = false;
    },
    setBalanceHistoryError: (state, action) => {
      state.error.balanceHistory = action.payload;
      state.isLoading.balanceHistory = false;
    },
    // Actions to set fetched data
    setCards: (state, action) => {
      state.cards = action.payload;
    },
    setTransactions: (state, action) => {
      state.transactions = action.payload;
    },
    setWeeklyActivity: (state, action) => {
      state.weeklyActivity = action.payload;
    },
    setExpenseStatistics: (state, action) => {
      state.expenseStatistics = action.payload;
    },
    setQuickTransfer: (state, action) => {
      state.quickTransfer = action.payload;
    },
    setBalanceHistory: (state, action) => {
      state.balanceHistory = action.payload;
    },
  },
});

// Export actions
export const {
  updateBalance,
  addCard,
  updateCard,
  removeCard,
  addTransaction,
  updateInvestments,
  updateWeeklyActivity,
  updateActivityCategories,
  addRecentRecipient,
  addSavedAccount,
  removeSavedAccount,
  updateTransferLimits,
  // Loading actions
  setCardsLoading,
  setTransactionsLoading,
  setWeeklyActivityLoading,
  setExpenseStatisticsLoading,
  setQuickTransferLoading,
  setBalanceHistoryLoading,
  // Error actions
  setCardsError,
  setTransactionsError,
  setWeeklyActivityError,
  setExpenseStatisticsError,
  setQuickTransferError,
  setBalanceHistoryError,
  // Data setting actions
  setCards,
  setTransactions,
  setWeeklyActivity,
  setExpenseStatistics,
  setQuickTransfer,
  setBalanceHistory,
} = dashboardSlice.actions;

// Async thunk action to fetch cards from API
export const fetchCards = () => async (dispatch) => {
  try {
    dispatch(setCardsLoading(true));
    const data = await fetchCardsData();
    dispatch(setCards(data.cards));
    dispatch(setCardsLoading(false));
  } catch (error) {
    dispatch(setCardsError(error.message));
  }
};

// Async thunk action to fetch transactions from API
export const fetchTransactions = () => async (dispatch) => {
  try {
    dispatch(setTransactionsLoading(true));
    const data = await fetchTransactionsData();
    dispatch(setTransactions(data.transactions));
    dispatch(setTransactionsLoading(false));
  } catch (error) {
    dispatch(setTransactionsError(error.message));
  }
};

// Async thunk action to fetch weekly activity from API
export const fetchWeeklyActivity = () => async (dispatch) => {
  try {
    dispatch(setWeeklyActivityLoading(true));
    const data = await fetchWeeklyActivityData();
    dispatch(setWeeklyActivity(data.weeklyActivity));
    dispatch(setWeeklyActivityLoading(false));
  } catch (error) {
    dispatch(setWeeklyActivityError(error.message));
  }
};

// Async thunk action to fetch expense statistics from API
export const fetchExpenseStatistics = () => async (dispatch) => {
  try {
    dispatch(setExpenseStatisticsLoading(true));
    const data = await fetchExpenseStatisticsData();
    dispatch(setExpenseStatistics(data.expenseStatistics));
    dispatch(setExpenseStatisticsLoading(false));
  } catch (error) {
    dispatch(setExpenseStatisticsError(error.message));
  }
};

// Async thunk action to fetch quick transfer data from API
export const fetchQuickTransfer = () => async (dispatch) => {
  try {
    dispatch(setQuickTransferLoading(true));
    const data = await fetchQuickTransferData();
    dispatch(setQuickTransfer(data.quickTransfer));
    dispatch(setQuickTransferLoading(false));
  } catch (error) {
    dispatch(setQuickTransferError(error.message));
  }
};

// Async thunk action to fetch balance history from API
export const fetchBalanceHistory = () => async (dispatch) => {
  try {
    dispatch(setBalanceHistoryLoading(true));
    const data = await fetchBalanceHistoryData();
    dispatch(setBalanceHistory(data.balanceHistory));
    dispatch(setBalanceHistoryLoading(false));
  } catch (error) {
    dispatch(setBalanceHistoryError(error.message));
  }
};

// Async thunk to fetch all dashboard data
export const fetchAllDashboardData = () => async (dispatch) => {
  // Fetch all data in parallel
  dispatch(fetchCards());
  dispatch(fetchTransactions());
  dispatch(fetchWeeklyActivity());
  dispatch(fetchExpenseStatistics());
  dispatch(fetchQuickTransfer());
  dispatch(fetchBalanceHistory());
};

// Selectors
export const selectBalance = (state) => state.dashboard.balance;
export const selectCards = (state) => state.dashboard.cards;
export const selectTransactions = (state) => state.dashboard.transactions;
export const selectInvestments = (state) => state.dashboard.investments;
export const selectWeeklyActivity = (state) => state.dashboard.weeklyActivity;
export const selectQuickTransfer = (state) => state.dashboard.quickTransfer;
export const selectExpenseStatistics = (state) =>
  state.dashboard.expenseStatistics;
export const selectBalanceHistory = (state) => state.dashboard.balanceHistory;

// Loading state selectors
export const selectCardsLoading = (state) => state.dashboard.isLoading.cards;
export const selectTransactionsLoading = (state) =>
  state.dashboard.isLoading.transactions;
export const selectWeeklyActivityLoading = (state) =>
  state.dashboard.isLoading.weeklyActivity;
export const selectExpenseStatisticsLoading = (state) =>
  state.dashboard.isLoading.expenseStatistics;
export const selectQuickTransferLoading = (state) =>
  state.dashboard.isLoading.quickTransfer;
export const selectBalanceHistoryLoading = (state) =>
  state.dashboard.isLoading.balanceHistory;

// Error state selectors
export const selectCardsError = (state) => state.dashboard.error.cards;
export const selectTransactionsError = (state) =>
  state.dashboard.error.transactions;
export const selectWeeklyActivityError = (state) =>
  state.dashboard.error.weeklyActivity;
export const selectExpenseStatisticsError = (state) =>
  state.dashboard.error.expenseStatistics;
export const selectQuickTransferError = (state) =>
  state.dashboard.error.quickTransfer;
export const selectBalanceHistoryError = (state) =>
  state.dashboard.error.balanceHistory;

export default dashboardSlice.reducer;
