import {createAsyncThunk} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {apiReviews, apiUsers} from "apis";
import {FetchUserResponse} from "store/types/FetchUserResponse";

export const fetchUser = createAsyncThunk<FetchUserResponse, string>(
  'admin/fetchUser', async (userId: string, {rejectWithValue, dispatch}) => {
    try {

      const [userRes, reviewsRes] = await Promise.all([
        apiUsers.fetchCurrentUser(userId),
        apiReviews.getUsersReviews(userId)
      ])

      return {user: userRes.data, reviews: reviewsRes.data};
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