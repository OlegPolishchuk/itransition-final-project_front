import {createAsyncThunk} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {apiReviews} from "apis";
import {fetchUserReviews} from "store/actions/reviews/fetchUserReviews";
import {RootState} from "store/store";

export const deleteReviews = createAsyncThunk<void, {reviewsId: string[], userId: string}, {state: RootState}>(
  'reviews/deleteReviews',
  async ({reviewsId, userId}: {reviewsId: string[], userId: string}, {rejectWithValue, dispatch}) => {

    try {
      const queryString = reviewsId.join(' ')
        .replaceAll(' ', '&id=');

      const res = await apiReviews.deleteReviews(queryString);

      if (res.status === 200 || res.status === 204) {
        dispatch(fetchUserReviews(userId))
      }

    }
    catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.message);
    }
  }
)