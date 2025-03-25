import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../services/api";

const initialState = {
  balance: {
    total: null,
    currency: null,
    change: null,
    chartData: [],
  },
  cards: [],
  transactions: [],
  investments: {
    total: null,
    change: null,
    chartData: [],
    assets: [],
  },
  weeklyActivity: null,
  quickTransfer: null,
  expenseStatistics: null,
  balanceHistory: null,
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
    const data = await apiService.fetchCardsData();
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
    const data = await apiService.fetchTransactionsData();
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
    const data = await apiService.fetchWeeklyActivityData();
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
    const data = await apiService.fetchExpenseStatisticsData();
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
    const data = await apiService.fetchQuickTransferData();
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
    const data = await apiService.fetchBalanceHistoryData();
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
