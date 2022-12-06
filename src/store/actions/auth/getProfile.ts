import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiAuth} from "apis";
import {AxiosError} from "axios";
import {localStorageData} from "shared";
import {logoutUser} from "store/actions/auth/logoutUser";

export const getProfile = createAsyncThunk(
  'auth/getProfile', async (token: string, {rejectWithValue, dispatch}) => {

    try {
      const res = await apiAuth.getProfile(token);

      if (res.status === 200) {
        const user = res.data;
        const token = user.token;
        const {tokenStartTime} = JSON.parse(localStorage.getItem(localStorageData.userData)as string);

        const dataToLocalStorage = {
          token,
          userId: user._id,
          tokenStartTime,
        }

        localStorage.setItem(localStorageData.userData,JSON.stringify(dataToLocalStorage))

        return res.data
      }
    }
    catch (e) {

      const error = e as AxiosError;
      if (!error.response) {
        throw e;
      }

      dispatch(logoutUser());

      return rejectWithValue(error.message)
    }
  }
)