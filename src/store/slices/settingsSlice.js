import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeTab: "profile",
  theme: "light",
  notifications: {
    email: true,
    push: true,
    sms: false,
    marketingEmails: false,
  },
  security: {
    twoFactorAuth: false,
  },
  preferences: {
    language: "en",
    currency: "USD",
  },
  isLoading: false,
  error: null,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    updateTheme: (state, action) => {
      state.theme = action.payload;
    },
    updateNotificationSettings: (state, action) => {
      state.notifications = { ...state.notifications, ...action.payload };
    },
    updateSecuritySettings: (state, action) => {
      state.security = { ...state.security, ...action.payload };
    },
    updatePreferences: (state, action) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    startSettingsLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    endSettingsLoading: (state) => {
      state.isLoading = false;
    },
    setSettingsError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    resetSettings: () => initialState,
  },
});

// Export actions
export const {
  setActiveTab,
  updateTheme,
  updateNotificationSettings,
  updateSecuritySettings,
  updatePreferences,
  startSettingsLoading,
  endSettingsLoading,
  setSettingsError,
  resetSettings,
} = settingsSlice.actions;

// Selectors
export const selectActiveTab = (state) => state.settings.activeTab;
export const selectTheme = (state) => state.settings.theme;
export const selectNotifications = (state) => state.settings.notifications;
export const selectSecurity = (state) => state.settings.security;
export const selectPreferences = (state) => state.settings.preferences;
export const selectSettingsLoading = (state) => state.settings.isLoading;
export const selectSettingsError = (state) => state.settings.error;

export default settingsSlice.reducer;
