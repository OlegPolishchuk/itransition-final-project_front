import {createAsyncThunk} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {apiReviews} from "apis";
import {FetchReviewsResponse, FetchReviews} from "store/types";
import {RootState} from "store/store";

export const fetchReviews = createAsyncThunk<FetchReviewsResponse, undefined | FetchReviews>(
  'reviews/fetchLatestReviews',
  async (sortData:FetchReviews = {sortReviews: '', reviewId: ''}, {rejectWithValue}) => {
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