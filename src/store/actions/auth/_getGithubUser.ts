import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { apiAuth } from 'apis';
import { localStorageService } from 'services';

export const _getGithubUser = createAsyncThunk(
  'auth/getGithubUser',
  async (token: string, { rejectWithValue }) => {
    try {
      const gitHubResponse = await axios.get('https://api.github.com/user', {
        headers: {
          Authorization: `token ${token}`,
        },
      });

      const { login, avatar_url, name } = gitHubResponse.data;

      console.log(`gitHubThunk login =`, login);
      const res = await apiAuth.socialLogin({ login, name, avatar_url });

      console.log(`gitHubThunk, res =`, res);
      localStorageService.setAuthUserData(res.data);

      return res.data;
    } catch (e) {
      const error = e as AxiosError;

      return rejectWithValue(error.message);
    }
  },
);
