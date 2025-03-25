// API service functions for fetching different data types

// Base API url
const API_URL = "/api";

/**
 * Generic fetch function with centralized error handling
 * @param {string} endpoint - The API endpoint to fetch from
 * @returns {Promise<any>} - JSON response data
 */
const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching data:`, error);
    throw error;
  }
};

// API service object with all data fetching functions
const apiService = {
  // Function to fetch cards data
  fetchCardsData: () => fetchData("cardsdata.json"),

  // Function to fetch transactions data
  fetchTransactionsData: () => fetchData("transactionsdata.json"),

  // Function to fetch weekly activity data
  fetchWeeklyActivityData: () => fetchData("weeklyactivitydata.json"),

  // Function to fetch expense statistics data
  fetchExpenseStatisticsData: () => fetchData("expensestatisticsdata.json"),

  // Function to fetch quick transfer data
  fetchQuickTransferData: () => fetchData("quicktransferdata.json"),

  // Function to fetch balance history data
  fetchBalanceHistoryData: () => fetchData("balancehistorydata.json"),
};

export default apiService;
