import {createAsyncThunk} from "@reduxjs/toolkit";
import {GenerateRandomUserData} from "store/types/GenerateRandomUserData";
import {AxiosError} from "axios";
import {apiUsers} from "apis";
import {fetchUsers} from "store/actions/users/fetchUsers";
import {RootState} from "store/store";

export const generateRandomUsers = createAsyncThunk<void, GenerateRandomUserData, {state: RootState}>(
  'admin/generateRandomUsers', async (data: GenerateRandomUserData, {rejectWithValue, dispatch}) => {

    try {
      const res = await apiUsers.generateRandomUsers(data);

      if (res.status === 200 || res.status === 201 || res.status === 204) {
        dispatch(fetchUsers());
      }
    }
    catch (e) {
      const err = e as AxiosError;
      if (!err.response) {
        throw e;
      }

      return rejectWithValue(err.message)
    }
  }
)