import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { apiUsers } from 'apis';
import { RootState } from 'store/store';
import { FetchUsersResponse } from 'store/types/responses/FetchUsersResponse';

export const fetchUsers = createAsyncThunk<
  FetchUsersResponse,
  void,
  { state: RootState }
>('admin/fetchUsers', async (_, { rejectWithValue, getState }) => {
  try {
    const { page, limit } = getState().adminReducer.tableSearchParams;

    const res = await apiUsers.fetchUsers(page, limit);

    return res.data;
  } catch (e) {
    const error = e as AxiosError;

    return rejectWithValue(error.message);
  }
});
