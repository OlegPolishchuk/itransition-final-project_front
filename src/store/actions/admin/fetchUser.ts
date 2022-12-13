import {createAsyncThunk} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {apiUsers} from "apis";
import {User} from "store/types/User";

export const fetchUser = createAsyncThunk<User, string>(
  'admin/fetchUser', async (userId: string, {rejectWithValue, dispatch}) => {
    try {
      const res = await apiUsers.fetchCurrentUser(userId)

      return res.data
    }
    catch (e) {
      const err = e as AxiosError;
      if (!err.response){
        throw err;
      }

      return rejectWithValue(err.message)
    }
  }
)