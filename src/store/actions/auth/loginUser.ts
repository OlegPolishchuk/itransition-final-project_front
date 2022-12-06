import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiAuth, AuthData} from "apis";
import {AxiosError} from "axios";
import {User} from "store/types/User";
import {localStorageService} from "services";

export const loginUser = createAsyncThunk<User, AuthData>(
  'app/loginUser', async (data: AuthData, {rejectWithValue}) => {

    try {
      const res = await apiAuth.login(data);

      localStorageService.setAuthUserData(res.data)

      return res.data;
    }
    catch (e) {
      const error = e as AxiosError;
      if (!error.response) {
        throw e;
      }

      const data = error.response.data as {message: string};

      return rejectWithValue(data.message);
    }

  }
)