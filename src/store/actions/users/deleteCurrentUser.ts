import {createAsyncThunk} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {apiUsers} from "apis";

export const deleteCurrentUser = createAsyncThunk(
  'admin/deleteCurrentUser',async (userId: string, {rejectWithValue}) => {

    try {
      await apiUsers.deleteUsers(userId)
    }
    catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.message)
    }

  }
)