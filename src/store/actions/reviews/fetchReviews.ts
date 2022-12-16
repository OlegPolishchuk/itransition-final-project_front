import {createAsyncThunk} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {apiReviews} from "apis";
import {FetchReviewsResponse, FetchReviews} from "store/types";

export const fetchReviews = createAsyncThunk<FetchReviewsResponse, undefined | FetchReviews, {}>(
  'reviews/fetchLatestReviews',
  async (sortData:FetchReviews = {sortReviews: '', reviewId: ''}, {rejectWithValue}) => {
    try {
      const res = await apiReviews.getReviews(sortData);

      return res.data;
    }
    catch (e) {
      const err = e as AxiosError;

      return rejectWithValue(err.message);
    }

  }
)