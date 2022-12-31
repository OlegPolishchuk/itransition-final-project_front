import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { apiReviews } from 'apis';

export const addOverallScore = createAsyncThunk(
  'review/addOverallScore',
  async (
    { reviewId, userId, score }: { reviewId: string; userId: string; score: number },
    { rejectWithValue },
  ) => {
    try {
      const res = await apiReviews.setPersonalScore(reviewId, userId, score);

      return res.data;
    } catch (e) {
      const err = e as AxiosError;

      return rejectWithValue(err.message);
    }
  },
);
