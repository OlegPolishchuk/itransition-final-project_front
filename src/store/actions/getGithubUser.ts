import {createAsyncThunk} from "@reduxjs/toolkit";
import axios, {AxiosError} from "axios";
import {apiAuth} from "apis";
import {setLocalStorageData} from "shared/utils";

export const getGithubUser = createAsyncThunk(
  'auth/getGithubUser', async (token: string, {rejectWithValue}) => {

    try {
      const gitHubResponse = await axios.get('https://api.github.com/user', {
        headers: {
          Authorization: `token ${token}`
        }
      })

      const login = gitHubResponse.data.login;

      const res = await apiAuth.socialLogin({login});

      setLocalStorageData(res.data);
      return res.data;

    } catch (e) {
      const error = e as AxiosError;

      return rejectWithValue(error.message)
    }

  }
)