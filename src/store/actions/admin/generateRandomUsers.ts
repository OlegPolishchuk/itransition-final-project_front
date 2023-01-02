import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { apiUsers } from 'apis';
import { responseStatus } from 'shared';
import { fetchUsers } from 'store/actions/admin/fetchUsers';
import { RootState } from 'store/store';
import { GenerateRandomData } from 'store/types';

export const generateRandomUsers = createAsyncThunk<
  void,
  GenerateRandomData,
  { state: RootState }
>(
  'admin/generateRandomUsers',
  async (data: GenerateRandomData, { rejectWithValue, dispatch }) => {
    try {
      const res = await apiUsers.generateRandomUsers(data);

      if (res.status === responseStatus.ok) {
        dispatch(fetchUsers());
      }
    } catch (e) {
      const err = e as AxiosError;

      if (!err.response) {
        throw e;
      }

      return rejectWithValue(err.message);
    }
  },
);
