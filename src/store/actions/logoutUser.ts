import {createAsyncThunk} from "@reduxjs/toolkit";
import {localStorageData} from "shared";
import {apiAuth} from "apis";
import {AxiosError} from "axios";
import {gapi} from "gapi-script";

export const logoutUser = createAsyncThunk(
  'auth/logout', async (_, {rejectWithValue}) => {

    try {
      const auth2 = gapi.auth2.getAuthInstance();

      await auth2.signOut();
      await apiAuth.logout();
      await localStorage.removeItem(localStorageData.userData)

      return;
    } catch (e) {
      const error = e as AxiosError;
      if (!error.response){
        throw e;
      }

      return rejectWithValue(error.message)
    }
  }
)