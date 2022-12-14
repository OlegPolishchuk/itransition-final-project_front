import {createAsyncThunk} from "@reduxjs/toolkit";
import {Locale, RandomReviewsData} from "store/types";
import {AxiosError} from "axios";
import {apiReviews} from "apis";
import {fetchUserReviews} from "store/actions/reviews/fetchUserReviews";
import {RootState} from "store/store";
import {GenerateRandomReviewsRequest} from "store/types/requests";

export const generateRandomReviews = createAsyncThunk<void, { data: RandomReviewsData, userId: string }, { state: RootState }>(
  'reviews/generateRandomReviews',
  async ({data, userId}: { data: RandomReviewsData, userId: string }, {
    rejectWithValue,
    dispatch,
  }) => {

    try {
      const updatedData: GenerateRandomReviewsRequest = {
        ...data,
        userId,
        locale: data.locale as Locale,
      };

      const res = await apiReviews.generateRandomReviews(updatedData);

      if (res.status === 200 || res.status === 201) {
        dispatch(fetchUserReviews(userId))
      }
    } catch (e) {
      const err = e as AxiosError;

      return rejectWithValue(err.message);
    }

  }
)