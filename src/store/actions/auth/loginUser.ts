import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { apiAuth, AuthData } from 'apis';
import { localStorageService } from 'services';
import { User } from 'store/types/User/User';

export const loginUser = createAsyncThunk<User, AuthData>(
  'app/loginUser',
  async (data: AuthData, { rejectWithValue }) => {
    try {
      const res = await apiAuth.login(data);

      localStorageService.setAuthUserData(res.data);

      return res.data;
    } catch (e) {
      const error = e as AxiosError;

      if (!error.response) {
        throw e;
      }

      const data = error.response.data as { message: string };

      return rejectWithValue(data.message);
    }
  },
);
