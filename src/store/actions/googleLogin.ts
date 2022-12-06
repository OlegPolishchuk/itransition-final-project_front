import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiAuth, AuthData} from "apis";
import {AxiosError} from "axios";
import {GoogleLoginData} from "store/types/GoogleResponse";
import {User} from "store/types/User";
import {setLocalStorageData} from "shared/utils";

export const googleLogin = createAsyncThunk<User, GoogleLoginData>(
  'auth/googleLogin', async (data:GoogleLoginData, {rejectWithValue}) => {

    try {
      const res = await apiAuth.googleLogin(data)

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