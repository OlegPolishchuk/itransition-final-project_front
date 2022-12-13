import {createAsyncThunk} from "@reduxjs/toolkit";
import {localStorageData} from "shared";
import {apiAuth} from "apis";
import {AxiosError} from "axios";
import {gapi} from "gapi-script";
import {localStorageService} from "services";

export const logoutUser = createAsyncThunk(
  'auth/logout', async (_, {rejectWithValue}) => {
    try {
      let auth2;

      if (gapi.auth2) {
        auth2 = gapi.auth2.getAuthInstance();

        await auth2.signOut();
      }


      await apiAuth.logout();
      await localStorageService.removeItem(localStorageData.userData)

      return;
    } catch (e) {
      console.log(e)
      const error = e as AxiosError;
      if (!error.response){
        throw e;
      }
      console.log(e)
      return rejectWithValue(error.message)
    }
  }
)