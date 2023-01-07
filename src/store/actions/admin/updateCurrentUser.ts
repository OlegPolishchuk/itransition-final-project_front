import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { apiUsers } from 'apis';
import { responseStatus } from 'shared';
import { fetchUser } from 'store/actions/admin/fetchUser';
import { RootState } from 'store/store';
import { User } from 'store/types/User/User';

export const updateCurrentUser = createAsyncThunk<
  void,
  Partial<User>,
  { state: RootState }
>(
  'admin/updateCurrentUser',
  async (user: Partial<User>, { rejectWithValue, dispatch, getState }) => {
    try {
      const { created } = getState().userReducer.selectedUser;
      const updatedUser = { ...user, created };

      const res = await apiUsers.updateCurrentUser(updatedUser);

      if (res.status === responseStatus.created) {
        dispatch(fetchUser(user._id as string));
      }
    } catch (e) {
      const err = e as AxiosError;

      return rejectWithValue(err.message);
    }
  },
);
