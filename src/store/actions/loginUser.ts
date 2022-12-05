import {createAsyncThunk} from "@reduxjs/toolkit";
import {AuthData, apiAuth} from "apis";
import {AxiosError} from "axios";
import {localStorageData} from "shared";
import {User} from "store/types/User";

export const loginUser = createAsyncThunk<User, AuthData>(
  'app/loginUser', async (data: AuthData, {rejectWithValue}) => {

    try {
      const res = await apiAuth.login(data);

      const user = res.data;
      const token = user.token;

      const dataToLocalStorage = {
        token,
        userId: user._id,
        tokenStartTime: Date.now(),
      }

      localStorage.setItem(localStorageData.userData,JSON.stringify(dataToLocalStorage))

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