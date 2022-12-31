import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { apiAuth } from 'apis';
import { localStorageService } from 'services';
import { localStorageData, responseStatus } from 'shared';
import { logoutUser } from 'store/actions';

export const getProfile = createAsyncThunk(
  'auth/getProfile',
  async (token: string, { rejectWithValue, dispatch }) => {
    try {
      const res = await apiAuth.getProfile(token);

      if (res.status === responseStatus.goodStatus) {
        const user = res.data;
        const { token } = user;

        const { tokenStartTime } = localStorageService.getItem(localStorageData.userData);

        const dataToLocalStorage = {
          token,
          userId: user._id,
          tokenStartTime,
        };

        localStorageService.setAuthUserData(dataToLocalStorage);

        return res.data;
      }
    } catch (e) {
      const error = e as AxiosError;

      if (!error.response) {
        throw e;
      }

      dispatch(logoutUser());

      return rejectWithValue(error.message);
    }
  },
);
