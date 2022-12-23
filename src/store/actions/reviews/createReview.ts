import {createAsyncThunk} from "@reduxjs/toolkit";
import {Review} from "store/types";
import {AxiosError} from "axios";
import {apiReviews} from "apis";
import {RootState} from "store/store";

export const createReview = createAsyncThunk<void, Partial<Review>, {state: RootState}>(
  'reviews/createReview', async (reviewData: Partial<Review>, {rejectWithValue, getState}) => {

    try {
      const userName = getState().userReducer.user.userName;
      const userId = getState().userReducer.user._id;
      const userAvatar = getState().userReducer.user.avatar;

      const newReviewData = {...reviewData, userAvatar, userName, userId}

      const res = await apiReviews.createNewReview(newReviewData)

      return res.data;
    }
    catch (e) {
      console.log(e)
      const err = e as AxiosError;
      return rejectWithValue(err.message)
    }
  }
)