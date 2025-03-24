import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: true, // For demo purposes, user is authenticated
  userInfo: {
    id: "usr-123456",
    name: "John Doe",
    username: "johndoe",
    email: "john.doe@example.com",
    profileImage: null,
    dateOfBirth: "1990-01-01",
    presentAddress: "123 Main Street, Apt 4B",
    permanentAddress: "456 Oak Avenue, Suite 7C",
    city: "New York",
    postalCode: "10001",
    country: "us",
  },
  isLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserProfile: (state, action) => {
      state.userInfo = { ...state.userInfo, ...action.payload };
    },
    updateProfileImage: (state, action) => {
      state.userInfo.profileImage = action.payload;
    },
    removeProfileImage: (state) => {
      state.userInfo.profileImage = null;
    },
    startLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    endLoading: (state) => {
      state.isLoading = false;
    },
    setError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.userInfo = initialState.userInfo;
    },
  },
});

// Export actions
export const {
  updateUserProfile,
  updateProfileImage,
  removeProfileImage,
  startLoading,
  endLoading,
  setError,
  logoutUser,
} = userSlice.actions;

// Selectors
export const selectUser = (state) => state.user.userInfo;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;
export const selectIsLoading = (state) => state.user.isLoading;
export const selectError = (state) => state.user.error;

export default userSlice.reducer;
