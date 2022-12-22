import {createAsyncThunk} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {apiUsers} from "apis";
import {RootState} from "store/store";
import {fetchUser} from "store/actions/admin";

export const changeUserAvatar = createAsyncThunk<void, FormData, {state: RootState}>(
  'user/changeUserAvatar', async (avatar: FormData, {rejectWithValue,dispatch, getState}) => {

    try {
      const userId = getState().userReducer.user._id;

      const res = await apiUsers.changeUserAvatar(avatar);

      // return res.data
      if (res.status === 200 || res.status === 201 || res.status === 204) {
        dispatch(fetchUser(userId))
      }
    }
    catch (e) {
      console.log(e)
      const err = e as AxiosError;
      return rejectWithValue(err.message)
    }

  }
)