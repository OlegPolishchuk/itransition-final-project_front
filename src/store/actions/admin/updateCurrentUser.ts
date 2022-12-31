import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { apiUsers } from 'apis';
import { responseStatus } from 'shared';
import { fetchUser } from 'store/actions/admin/fetchUser';
import { User } from 'store/types/User/User';

export const updateCurrentUser = createAsyncThunk(
  'admin/updateCurrentUser',
  async (user: Partial<User>, { rejectWithValue, dispatch }) => {
    try {
      const res = await apiUsers.updateCurrentUser(user);

      if (res.status === responseStatus.goodStatus) {
        dispatch(fetchUser(user._id as string));
      }
    } catch (e) {
      const err = e as AxiosError;

      return rejectWithValue(err.message);
    }
  },
);
