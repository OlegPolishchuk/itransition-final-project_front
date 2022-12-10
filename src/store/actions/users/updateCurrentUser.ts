import {createAsyncThunk} from "@reduxjs/toolkit";
import {User} from "store/types/User";
import {AxiosError} from "axios";
import {apiUsers} from "apis";
import {fetchUser} from "store/actions/users/fetchUser";

export const updateCurrentUser = createAsyncThunk(
  'admin/updateCurrentUser', async (user: Partial<User>, {rejectWithValue, dispatch}) => {

    try {
      const res = await apiUsers.updateCurrentUser(user);

      if (res.status === 200 || res.status === 201 || res.status === 204) {
        dispatch(fetchUser(user._id as string))
      }
    }
    catch (e) {
      console.log(e)
      const err = e as AxiosError;

      return rejectWithValue(err.message);
    }

  }
)