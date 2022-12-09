import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiUsers} from "apis";
import {AxiosError} from "axios";
import {FetchUsersResponse} from "store/types/FetchUsersResponse";
import {RootState} from "store/store";

export const fetchUsers = createAsyncThunk<FetchUsersResponse, void, {state: RootState}>(
  'admin/fetchUsers', async (_, {rejectWithValue, getState}) => {
    try {
      const {page, limit} = getState().adminReducer.tableSearchParams;

      console.log('page in thunk', page)
      const res = await apiUsers.fetchUsers(page, limit);

      return res.data;
    }
    catch (e) {
      const error = e as AxiosError;

      return rejectWithValue(error.message)
    }
  }
)