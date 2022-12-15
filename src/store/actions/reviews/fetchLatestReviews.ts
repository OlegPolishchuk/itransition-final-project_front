import {createAsyncThunk} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {apiReviews} from "apis";

export const fetchLatestReviews = createAsyncThunk(
  'reviews/fetchLatestReviews', async (_, {rejectWithValue}) => {
    try {
      const res = await apiReviews.getLatestReviews();

      return res.data;
    }
    catch (e) {
      const err = e as AxiosError;

      return rejectWithValue(err.message);
    }

  }
)