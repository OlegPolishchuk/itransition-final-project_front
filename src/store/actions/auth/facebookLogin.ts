import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { apiAuth } from 'apis';
import { localStorageService } from 'services';
import { SocialResponse } from 'store/types';

export const facebookLogin = createAsyncThunk(
  'auth/facebookLogin',
  async (data: SocialResponse, { rejectWithValue }) => {
    try {
      const { login, name, avatar_url } = data;

      const res = await apiAuth.socialLogin({ login, name, avatar_url });

      localStorageService.setAuthUserData(res.data);

      return res.data;
    } catch (e) {
      const err = e as AxiosError;

      return rejectWithValue(err.message);
    }
  },
);
