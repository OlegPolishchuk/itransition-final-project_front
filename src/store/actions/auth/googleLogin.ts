import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiAuth} from "apis";
import {AxiosError} from "axios";
import {User} from "store/types/User";
import {SocialResponse} from "store/types/SocialResponse";
import {localStorageService} from "services";

export const googleLogin = createAsyncThunk<User, SocialResponse>(
  'auth/googleLogin', async (data:SocialResponse, {rejectWithValue}) => {

    try {
      const {login} = data;
      const res = await apiAuth.socialLogin({login});

      localStorageService.setAuthUserData(res.data);
      return res.data;

    } catch (e) {
      const error = e as AxiosError;

      if (!error.response) {
        throw e
      }

      return rejectWithValue(error.message)
    }

  }
)