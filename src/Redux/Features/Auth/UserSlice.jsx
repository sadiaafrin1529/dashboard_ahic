import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user") || "null") : null,
  token: typeof window !== "undefined" ? localStorage.getItem("token") || null : null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: { 
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      
      // Save user and token to localStorage
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;

      // Remove from localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }
});

export const { login, logout } = userSlice.actions;
export const selectUser = (state) => state.user.user;
export const selectToken = (state) => state.user.token; 

export default userSlice.reducer;
