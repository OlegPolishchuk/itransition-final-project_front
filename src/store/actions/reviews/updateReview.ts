import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { apiReviews } from 'apis';
import { Review } from 'store/types';

export const updateReview = createAsyncThunk(
  'review/updateReview',
  async (review: Review, { rejectWithValue }) => {
    try {
      const res = await apiReviews.updateReview(review);

      return res.data;
    } catch (e) {
      const err = e as AxiosError;

      return rejectWithValue(err.message);
    }
  },
);
