import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  loginHistory: [], // Initial state for login history
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    updateLoginHistory: (state, action) => {
      state.loginHistory = action.payload; // Assuming action.payload is an array of login history entries
    },
  },
});

// Export action creators
export const { login, logout, updateLoginHistory } = userSlice.actions;

// Selector functions
export const selectUser = (state) => state.user.user; // Assuming 'user' is your slice name
export const selectLoginHistory = (state) => state.user.loginHistory; // Select login history from state

// Reducer
export default userSlice.reducer;
