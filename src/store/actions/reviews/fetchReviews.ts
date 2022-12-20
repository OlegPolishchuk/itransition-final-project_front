import {createAsyncThunk} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {apiReviews} from "apis";
import {FetchReviews, FetchReviewsResponse} from "store/types";

export const fetchReviews = createAsyncThunk<FetchReviewsResponse, undefined | FetchReviews>(
  'reviews/fetchLatestReviews',
  async (sortData:FetchReviews = {reviewsSortParams: 'created', reviewId: ''}, {rejectWithValue}) => {
    try {
      const page =  sortData.page
        ? sortData.page
        : 0;

      const updatedSortData: FetchReviews = {...sortData, page };

      const res = await apiReviews.getReviews(updatedSortData);

      return res.data;
    }
    catch (e) {
      const err = e as AxiosError;

      return rejectWithValue(err.message);
    }

  }
)