import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state) => {
      state.isLoading = true;
    },
    loggedIn: (state, { payload }) => {
      state.isLoading = false;
      state.currentUser = payload;
      state.isAuthenticated = true;
    },
    loginFailed: (state) => {
      state.isLoading = false;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
    },
  },
});

export const { login, loggedIn, loginFailed, logout } = userSlice.actions;
export default userSlice.reducer;
