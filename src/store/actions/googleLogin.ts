import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiAuth} from "apis";
import {AxiosError} from "axios";
import {User} from "store/types/User";
import {setLocalStorageData} from "shared/utils";
import {SocialResponse} from "store/types/SocialResponse";

export const googleLogin = createAsyncThunk<User, SocialResponse>(
  'auth/googleLogin', async (data:SocialResponse, {rejectWithValue}) => {

    try {
      const {login} = data;
      const res = await apiAuth.socialLogin({login})

      setLocalStorageData(res.data)
      return res.data

    } catch (e) {
      const error = e as AxiosError;

      if (!error.response) {
        throw e
      }

      return rejectWithValue(error.message)
    }

  }
)