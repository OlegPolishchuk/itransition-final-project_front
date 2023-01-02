import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { apiUsers } from 'apis';
import { responseStatus } from 'shared';
import { fetchUsers } from 'store/actions/admin/fetchUsers';
import { RootState } from 'store/store';

export const deleteUsers = createAsyncThunk<void, string[], { state: RootState }>(
  'admin/deleteUsers',
  async (usersId: string[], { rejectWithValue, dispatch }) => {
    if (!usersId.length) return;

    try {
      const queryString = usersId.join(' ').replaceAll(' ', '&id=');

      const res = await apiUsers.deleteUsers(queryString);

      if (res.status === responseStatus.noContent) {
        dispatch(fetchUsers());
      }
    } catch (e) {
      const err = e as AxiosError;

      if (!err.response) {
        throw err;
      }

      return rejectWithValue(err.message);
    }
  },
);
