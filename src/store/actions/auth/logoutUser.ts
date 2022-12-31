import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { gapi } from 'gapi-script';

import { apiAuth } from 'apis';
import { localStorageService } from 'services';
import { localStorageData } from 'shared';

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      let auth2;

      if (gapi.auth2) {
        auth2 = gapi.auth2.getAuthInstance();

        await auth2.signOut();
      }

      await apiAuth.logout();
      await localStorageService.removeItem(localStorageData.userData);

      return;
    } catch (e) {
      const error = e as AxiosError;

      if (!error.response) {
        throw e;
      }

      return rejectWithValue(error.message);
    }
  },
);
