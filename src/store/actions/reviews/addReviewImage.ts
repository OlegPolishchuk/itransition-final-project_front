import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { apiReviews } from 'apis';

export const addReviewImage = createAsyncThunk(
  'review/addReviewImage',
  async (image: FormData, { rejectWithValue }) => {
    try {
      const res = await apiReviews.setReviewImage(image);

      return res.data;
    } catch (e) {
      const err = e as AxiosError;

      return rejectWithValue(err.message);
    }
  },
);
