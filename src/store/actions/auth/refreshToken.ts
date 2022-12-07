import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiAuth} from "apis";
import {localStorageData} from "shared";
import {AxiosError} from "axios";
import {logoutUser} from "store/actions/auth/logoutUser";

export const refreshToken = createAsyncThunk(
  'auth/refreshToken', async (_,{rejectWithValue, dispatch}) => {

    try {
      const res = await apiAuth.refreshToken();

      const storageData = JSON.parse(localStorage.getItem(localStorageData.userData) as string);

      const userId = storageData.userId;

      const updatedStorageData = {
        userId,
        token: res.data.token,
        tokenStartTime: Date.now(),
      };

      localStorage.setItem(localStorageData.userData, JSON.stringify(updatedStorageData));

      return res.data;
    } catch (e) {
      const error = e as AxiosError;
      if (!error.response) {
        throw e;
      }
      debugger
      await dispatch(logoutUser());
      return rejectWithValue(error.message)
    }

  }
)