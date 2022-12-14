import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { apiAuth } from 'apis';
import { localStorageService } from 'services';

export const getGithubUser = createAsyncThunk(
  'auth/getGithubToken',
  async (code: string, { rejectWithValue }) => {
    try {
      const res = await apiAuth.githubLogin(code);

      localStorageService.setAuthUserData(res.data);

      return res.data;
    } catch (e) {
      const err = e as AxiosError;

      return rejectWithValue(err.message);
    }
  },
);
