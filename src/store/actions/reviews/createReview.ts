import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { apiReviews } from 'apis';
import { RootState } from 'store/store';
import { Review } from 'store/types';

export const createReview = createAsyncThunk<void, Partial<Review>, { state: RootState }>(
  'reviews/createReview',
  async (reviewData: Partial<Review>, { rejectWithValue, getState }) => {
    try {
      const userRole = getState().userReducer.user.role;

      let { userName } = getState().userReducer.user;
      let userId = getState().userReducer.user._id;
      let userAvatar = getState().userReducer.user.avatar;

      if (userRole === 'admin') {
        userName = getState().userReducer.selectedUser.userName;
        userId = getState().userReducer.selectedUser._id;
        userAvatar = getState().userReducer.selectedUser.avatar;
      }

      const newReviewData = { ...reviewData, userAvatar, userName, userId };

      const res = await apiReviews.createNewReview(newReviewData);

      return res.data;
    } catch (e) {
      const err = e as AxiosError;

      return rejectWithValue(err.message);
    }
  },
);
