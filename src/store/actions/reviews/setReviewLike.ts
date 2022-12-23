import {createAsyncThunk} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {apiReviews} from "apis";

export const setReviewLike = createAsyncThunk(
  'review/setReviewLike',
  async ({reviewId, userId}: {reviewId: string, userId: string}, {rejectWithValue}) => {

    try {
      const res = await apiReviews.setReviewLike(reviewId, userId);

      return res.data
    }
    catch (e){
      console.log(e)
      const err = e as AxiosError;
      return rejectWithValue(err.message)
    }

  }
)