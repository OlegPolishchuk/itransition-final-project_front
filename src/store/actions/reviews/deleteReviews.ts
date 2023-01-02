import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { apiReviews } from 'apis';
import { responseStatus } from 'shared';
import { fetchUserReviews } from 'store/actions/reviews/fetchUserReviews';
import { RootState } from 'store/store';

export const deleteReviews = createAsyncThunk<
  void,
  { reviewsId: string[]; userId: string },
  { state: RootState }
>(
  'reviews/deleteReviews',
  async (
    { reviewsId, userId }: { reviewsId: string[]; userId: string },
    { rejectWithValue, dispatch },
  ) => {
    try {
      const queryString = reviewsId.join(' ').replaceAll(' ', '&id=');

      const res = await apiReviews.deleteReviews(queryString);

      if (res.status === responseStatus.ok) {
        dispatch(fetchUserReviews(userId));
      }
    } catch (e) {
      const err = e as AxiosError;

      return rejectWithValue(err.message);
    }
  },
);
