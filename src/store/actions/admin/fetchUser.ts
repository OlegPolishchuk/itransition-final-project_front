import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { apiUsers } from 'apis';
import { UserRole } from 'shared';
import { setCurrentUser } from 'store/reducers';
import { RootState } from 'store/store';
import { User } from 'store/types/User/User';

export const fetchUser = createAsyncThunk<User, string, { state: RootState }>(
  'admin/fetchUser',
  async (userId: string, { rejectWithValue, getState, dispatch }) => {
    try {
      const res = await apiUsers.fetchCurrentUser(userId);

      const { role } = getState().userReducer.user;

      if (role === UserRole.Admin || role === UserRole.Manager) {
        dispatch(setCurrentUser(res.data));
      }

      return res.data;
    } catch (e) {
      const err = e as AxiosError;

      if (!err.response) {
        throw err;
      }

      return rejectWithValue(err.message);
    }
  },
);
