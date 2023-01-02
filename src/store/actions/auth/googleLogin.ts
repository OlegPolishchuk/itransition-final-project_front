import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { apiAuth } from 'apis';
import { localStorageService } from 'services';
import { SocialResponse, User } from 'store/types';

export const googleLogin = createAsyncThunk<User, SocialResponse>(
  'auth/googleLogin',
  async (data: SocialResponse, { rejectWithValue }) => {
    try {
      const { login, name } = data;
      const res = await apiAuth.socialLogin({ login, name });

      localStorageService.setAuthUserData(res.data);

      return res.data;
    } catch (e) {
      console.log(e);
      const error = e as AxiosError;

      if (!error.response) {
        throw e;
      }

      return rejectWithValue(error.message);
    }
  },
);
