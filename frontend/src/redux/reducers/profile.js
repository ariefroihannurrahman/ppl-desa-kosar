/* eslint-disable no-param-reassign */
// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit';
import * as profileActions from '../asyncActions/profile';

const initialState = {
  profile: null,
  status: 'idle',
  err: null,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    handleChangeStatus: (state, action) => {
      state.status = action.payload;
    },
    handleReset: (state) => {
      // eslint-disable-next-line no-unused-vars
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(profileActions.getProfile.fulfilled, (state, action) => {
      state.status = action.type;
      state.profile = action.payload.result;
    });
    builder.addCase(profileActions.getProfile.rejected, (state, action) => {
      state.status = action.type;
      state.err = action.error;
    });
    builder.addCase(profileActions.getProfile.pending, (state, action) => {
      state.status = action.type;
    });
    builder.addCase(profileActions.updateProfile.fulfilled, (state, action) => {
      state.status = action.type;
      state.profile = action.payload.result;
    });
    builder.addCase(profileActions.updateProfile.rejected, (state, action) => {
      state.status = action.type;
      state.err = action.error;
    });
    builder.addCase(profileActions.updateProfile.pending, (state, action) => {
      state.status = action.type;
    });
  },
});

export const {
  handleChangeStatus,
  handleReset,
} = profileSlice.actions;

export default profileSlice.reducer;
