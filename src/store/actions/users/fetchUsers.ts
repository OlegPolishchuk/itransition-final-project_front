import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiUsers} from "apis";
import {AxiosError} from "axios";
import {User} from "store/types/User";

export const fetchUsers = createAsyncThunk<User[], void>(
  'admin/fetchUsers', async (_, {rejectWithValue}) => {
    try {
      const res = await apiUsers.fetchUsers();

      return res.data;
    }
    catch (e) {
      const error = e as AxiosError;

      return rejectWithValue(error.message)
    }
  }
)