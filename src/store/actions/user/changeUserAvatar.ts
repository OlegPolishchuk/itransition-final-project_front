import {createAsyncThunk} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {apiUsers} from "apis";
import {RootState} from "store/store";
import {fetchUser} from "store/actions/admin";

export const changeUserAvatar = createAsyncThunk<{avatar: string}, FormData>(
  'user/changeUserAvatar', async (avatar: FormData, {rejectWithValue}) => {

    try {
      const res = await apiUsers.changeUserAvatar(avatar);

      return res.data;
    }
    catch (e) {
      console.log(e)
      const err = e as AxiosError;
      return rejectWithValue(err.message)
    }

  }
)