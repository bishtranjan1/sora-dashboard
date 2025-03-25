// API service functions for fetching different data types

// Base API url
const API_URL = "/api";

// Function to fetch cards data
export const fetchCardsData = async () => {
  try {
    const response = await fetch(`${API_URL}/cardsdata.json`);
    if (!response.ok) {
      throw new Error(`Failed to fetch cards data: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching cards data:", error);
    throw error;
  }
};

// Function to fetch transactions data
export const fetchTransactionsData = async () => {
  try {
    const response = await fetch(`${API_URL}/transactionsdata.json`);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch transactions data: ${response.statusText}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching transactions data:", error);
    throw error;
  }
};

// Function to fetch weekly activity data
export const fetchWeeklyActivityData = async () => {
  try {
    const response = await fetch(`${API_URL}/weeklyactivitydata.json`);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch weekly activity data: ${response.statusText}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching weekly activity data:", error);
    throw error;
  }
};

// Function to fetch expense statistics data
export const fetchExpenseStatisticsData = async () => {
  try {
    const response = await fetch(`${API_URL}/expensestatisticsdata.json`);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch expense statistics data: ${response.statusText}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching expense statistics data:", error);
    throw error;
  }
};

// Function to fetch quick transfer data
export const fetchQuickTransferData = async () => {
  try {
    const response = await fetch(`${API_URL}/quicktransferdata.json`);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch quick transfer data: ${response.statusText}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching quick transfer data:", error);
    throw error;
  }
};

// Function to fetch balance history data
export const fetchBalanceHistoryData = async () => {
  try {
    const response = await fetch(`${API_URL}/balancehistorydata.json`);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch balance history data: ${response.statusText}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching balance history data:", error);
    throw error;
  }
};
