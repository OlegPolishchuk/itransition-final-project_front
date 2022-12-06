import {createAsyncThunk} from "@reduxjs/toolkit";
import {setLocalStorageData} from "shared/utils";
import axios, {AxiosError} from "axios";
import {apiAuth} from "apis";

export const twitterLogin = createAsyncThunk(
  'auth/twitterLogin', async (login: string, {rejectWithValue}) => {
    console.log('twitter thunk')
    try {
      const res = await apiAuth.socialLogin({login})

      setLocalStorageData(res.data);

      return res.data;
    } catch (e) {
      const error = e as AxiosError;
      if (!error.response) {
        throw e;
      }

      return rejectWithValue(error.message)
    }

  }
)