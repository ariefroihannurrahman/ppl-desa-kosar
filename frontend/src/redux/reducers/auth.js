/* eslint-disable no-param-reassign */
// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit';
import * as authActions from '../asyncActions/auth';

const initialState = {
  data: null,
  status: 'idle',
  error: null,

};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    handleChangeStatus: (state, action) => {
      state.status = action.payload;
    },
    handleReset: (state) => {
      state.status = initialState.status;
      state.error = initialState.error;
      state.data = initialState.data;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authActions.login.fulfilled, (state, action) => {
      localStorage.setItem('isLoggedIn', 'true');
      state.status = action.type;
      state.data = action.payload.result;
    });
    builder.addCase(authActions.login.rejected, (state, action) => {
      state.status = action.type;
      state.error = action.error;
    });
    builder.addCase(authActions.login.pending, (state, action) => {
      state.status = action.type;
    });
    builder.addCase(authActions.register.fulfilled, (state, action) => {
      state.status = action.type;
      state.data = action.payload.result;
    });
    builder.addCase(authActions.register.rejected, (state, action) => {
      state.status = action.type;
      state.error = action.error;
    });
    builder.addCase(authActions.register.pending, (state, action) => {
      state.status = action.type;
    });
    builder.addCase(authActions.forgotPassword.fulfilled, (state, action) => {
      state.status = action.type;
      state.data = action.payload.result;
    });
    builder.addCase(authActions.forgotPassword.rejected, (state, action) => {
      state.status = action.type;
      state.error = action.error;
    });
    builder.addCase(authActions.forgotPassword.pending, (state, action) => {
      state.status = action.type;
    });
    builder.addCase(authActions.resetPassword.fulfilled, (state, action) => {
      state.status = action.type;
      state.data = action.payload.result;
    });
    builder.addCase(authActions.resetPassword.rejected, (state, action) => {
      state.status = action.type;
      state.error = action.error;
    });
    builder.addCase(authActions.resetPassword.pending, (state, action) => {
      state.status = action.type;
    });
  },
});

export const {
  handleChangeStatus,
  handleReset,
} = authSlice.actions;

export default authSlice.reducer;
