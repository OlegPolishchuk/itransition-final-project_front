import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { AuthData, apiAuth } from 'apis';

export const registerUser = createAsyncThunk<
  { message: string },
  AuthData,
  { rejectValue: { message: string } }
>('auth/registerUser', async (data: AuthData, { rejectWithValue }) => {
  try {
    const res = await apiAuth.register(data);

    return res.data;
  } catch (e) {
    const error = e as AxiosError;

    if (!error.response) {
      throw e;
    }
    const data = error.response.data as { message: string };

    return rejectWithValue(data);
  }
});
