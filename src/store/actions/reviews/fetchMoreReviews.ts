import {createAsyncThunk} from "@reduxjs/toolkit";
import {FetchReviews, FetchReviewsResponse} from "store/types";
import {apiReviews} from "apis";
import {AxiosError} from "axios/index";
import {RootState} from "store/store";

export const fetchMoreReviews = createAsyncThunk<FetchReviewsResponse, undefined | FetchReviews, {state: RootState}>(
  'reviews/fetchMoreReviews',
  async (sortData:FetchReviews = {reviewsSortParams: 'created', reviewId: ''}, {rejectWithValue, getState}) => {
    try {
      const page =  sortData.page
        ? sortData.page
        :getState().reviewsReducer.paginationParams.page;

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