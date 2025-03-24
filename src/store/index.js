import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import dashboardReducer from "./slices/dashboardSlice";
import settingsReducer from "./slices/settingsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    dashboard: dashboardReducer,
    settings: settingsReducer,
  },
});
