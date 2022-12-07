import {createAsyncThunk} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {apiUsers} from "apis";
import {fetchUsers} from "store/actions/users/fetchUsers";

export const deleteUsers = createAsyncThunk(
  'users/deleteUsers', async (usersId: string[], {rejectWithValue, dispatch}) => {

    if (!usersId.length) return;

    try {
      const queryString = usersId.join(' ')
        .replaceAll(' ', '&id=')

      const res = await apiUsers.deleteUsers(queryString);

      if (res.status === 200 || res.status === 204) {
        dispatch(fetchUsers())
      }
    }
    catch (e) {
      console.log(e);
      const err = e as AxiosError;
      if (!err.response){
        throw err;
      }

      return rejectWithValue(err.message);
    }
  }
)