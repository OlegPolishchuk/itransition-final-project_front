import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { apiUsers } from 'apis';
import { responseStatus } from 'shared';
import { fetchUsers } from 'store/actions/admin/fetchUsers';
import { RootState } from 'store/store';
import { UpdatedUsersStatusRequest } from 'store/types/requests/UpdatedUsersStatusRequest';

export const updateUsersStatus = createAsyncThunk<
  void,
  UpdatedUsersStatusRequest[],
  { state: RootState }
>(
  'blockUsers',
  async (users: UpdatedUsersStatusRequest[], { rejectWithValue, dispatch }) => {
    if (!users.length) return;

    try {
      const res = await apiUsers.updateUsersStatus(users);

      if (res.status === responseStatus.noContent) {
        dispatch(fetchUsers());
      }
    } catch (e) {
      const error = e as AxiosError;

      return rejectWithValue(error.message);
    }
  },
);
