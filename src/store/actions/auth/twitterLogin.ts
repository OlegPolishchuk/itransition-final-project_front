import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { apiAuth } from 'apis';
import { localStorageService } from 'services';

export const twitterLogin = createAsyncThunk(
  'auth/twitterLogin',
  async (login: string, { rejectWithValue }) => {
    try {
      const res = await apiAuth.socialLogin({ login });

      localStorageService.setAuthUserData(res.data);

      return res.data;
    } catch (e) {
      const error = e as AxiosError;

      if (!error.response) {
        throw e;
      }

      return rejectWithValue(error.message);
    }
  },
);
