import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  isAuthenticated: typeof window !== "undefined" && !!localStorage.getItem("token"),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
