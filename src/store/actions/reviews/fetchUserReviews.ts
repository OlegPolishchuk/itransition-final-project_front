import {createAsyncThunk} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {apiReviews} from "apis";
import {FetchUserReviewsResponse} from "store/types/responses/FetchUserReviewsResponse";
import {RootState} from "store/store";

export const fetchUserReviews = createAsyncThunk<FetchUserReviewsResponse, string, {state: RootState}>(
  'reviews/fetchUserReviews',
  async (userId: string, {rejectWithValue, getState}) => {
    try {
      const {page, limit} = getState().reviewsReducer.paginationParams;

      const res = await apiReviews.getUsersReviews(userId, page, limit);

      return res.data;
    }
    catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.message)
    }
  }
)