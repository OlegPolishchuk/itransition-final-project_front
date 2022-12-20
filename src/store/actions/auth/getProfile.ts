import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiAuth} from "apis";
import {AxiosError} from "axios";
import {localStorageData} from "shared";
import {logoutUser} from "store/actions/auth/logoutUser";
import {localStorageService} from "services";

export const getProfile = createAsyncThunk(
  'auth/getProfile', async (token: string, {rejectWithValue, dispatch}) => {

    try {
      const res = await apiAuth.getProfile(token);

      if (res.status === 200) {
        const user = res.data;
        const token = user.token;

        const {tokenStartTime} = localStorageService.getItem(localStorageData.userData);

        const dataToLocalStorage = {
          token,
          userId: user._id,
          tokenStartTime,
        }

        localStorageService.setAuthUserData(dataToLocalStorage)

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