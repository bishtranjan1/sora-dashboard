import { createSlice } from "@reduxjs/toolkit";

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
  isLoading: false,
  error: null,
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
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    setCards: (state, action) => {
      state.cards = action.payload;
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
  setLoading,
  setError,
  setCards,
} = dashboardSlice.actions;

// Async thunk action to fetch cards from API
export const fetchCards = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetch("/api/cardsdata.json");
    if (!response.ok) {
      throw new Error("Failed to fetch card data");
    }
    const data = await response.json();
    dispatch(setCards(data.cards));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

// Selectors
export const selectBalance = (state) => state.dashboard.balance;
export const selectCards = (state) => state.dashboard.cards;
export const selectTransactions = (state) => state.dashboard.transactions;
export const selectInvestments = (state) => state.dashboard.investments;
export const selectWeeklyActivity = (state) => state.dashboard.weeklyActivity;
export const selectQuickTransfer = (state) => state.dashboard.quickTransfer;
export const selectDashboardLoading = (state) => state.dashboard.isLoading;
export const selectDashboardError = (state) => state.dashboard.error;

export default dashboardSlice.reducer;
