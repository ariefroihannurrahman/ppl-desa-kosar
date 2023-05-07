import { createAsyncThunk } from '@reduxjs/toolkit';

import authService from '../../repositories/auth.repo';

export const loginActionType = 'auth/login';
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }) => {
    const form = {
      email,
      password,
    };
    const encoded = new URLSearchParams(form);
    const { data } = await authService.login(encoded.toString());
    return data;
  },
);

export const registerActionType = 'auth/register';
export const register = createAsyncThunk(
  'auth/register',
  async ({ email, password }) => {
    const form = {
      email,
      password,
    };
    const encoded = new URLSearchParams(form);
    const { data } = await authService.register(encoded.toString());
    return data;
  },
);

export const forgotPasswordActionType = 'auth/forgotPassword';
export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async ({ email }) => {
    const form = {
      email,
    };
    const encoded = new URLSearchParams(form);
    const { data } = await authService.forgotPassword(encoded.toString());
    return data;
  },
);

export const resetPasswordActionType = 'auth/resetPassword';
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({
    email, code, newPassword, confirmPassword,
  }) => {
    const form = {
      email,
      code,
      newPassword,
      confirmPassword,
    };
    const encoded = new URLSearchParams(form);
    const { data } = await authService.resetPassword(encoded.toString());
    return data;
  },
);
