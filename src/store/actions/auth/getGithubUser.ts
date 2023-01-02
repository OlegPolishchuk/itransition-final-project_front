import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { apiAuth } from 'apis';

export const getGithubUser = createAsyncThunk(
  'auth/getGithubToken',
  async (code: string, { rejectWithValue }) => {
    try {
      const res = await apiAuth.githubLogin(code);

      console.log(res.data);

      return res.data;
    } catch (e) {
      const err = e as AxiosError;

      return rejectWithValue(err.message);
    }
  },
);
