import { createAsyncThunk } from '@reduxjs/toolkit';
import profileService from '../../repositories/profile.repo';

export const getProfileActionType = 'profile/getProfile';
export const getProfile = createAsyncThunk(
  'profile/getProfile',
  async (token) => {
    const { data } = await profileService.getProfile(token);
    return data;
  },
);

export const updateProfileActionType = 'profile/updateProfile';
export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async ({ token, val }) => {
    const { fullName, image, birthDate } = val;
    const form = new FormData();
    form.append('fullName', fullName);
    form.append('picture', image);
    form.append('birthDate', birthDate);
    const { data } = await profileService.updateProfile(token, form);
    return data;
  },
);
