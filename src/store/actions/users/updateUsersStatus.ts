import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiUsers} from "apis";
import {fetchUsers} from "store/actions/users/fetchUsers";
import {AxiosError} from "axios";
import {UpdatedUsersStatusRequest} from "store/types/UpdatedUsersStatusRequest";

export const updateUsersStatus = createAsyncThunk(
  'blockUsers', async (users: UpdatedUsersStatusRequest[], {rejectWithValue, dispatch}) => {
    if (!users.length) return;

    try {

      const res = await apiUsers.updateUsersStatus(users);

      if (res.status === 200 || res.status === 204) {
        dispatch(fetchUsers());
      }
    }
    catch (e) {
      console.log(e);

      const error = e as AxiosError;
      return rejectWithValue(error.message)
    }

  }
)