/* eslint-disable no-param-reassign */
// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
};

export const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    handleReset: (state) => {
      localStorage.removeItem('token');
      state.token = initialState.token;
    },
    handleSetToken: (state, action) => {
      localStorage.setItem('token', action.payload);
      state.token = action.payload;
    },
    extraReducers: () => { },
  },

});

export const {
  handleSetToken,
  handleReset,
} = authorizationSlice.actions;

export default authorizationSlice.reducer;
