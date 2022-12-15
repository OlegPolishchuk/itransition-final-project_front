import {createAsyncThunk} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {apiReviews} from "apis";

export const fetchPopularReviews = createAsyncThunk(
  'reviews/fetchPopularReviews', async (_, {rejectWithValue}) => {

    try {
      const res = await apiReviews.getPopularReviews();

      return res.data;
    }
    catch (e) {
      const err = e as AxiosError;

      return rejectWithValue(err.message)
    }

  }
)