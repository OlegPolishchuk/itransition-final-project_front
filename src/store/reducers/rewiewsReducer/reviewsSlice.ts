import {createSlice} from "@reduxjs/toolkit";
import {fetchUserReviews, getTags} from "store/actions";
import {paginationDefaultParams} from "shared";
import {ReviewsState} from "store/types";
import {fetchLatestReviews} from "store/actions/reviews/fetchLatestReviews";


const initialState: ReviewsState = {
  tags: [],
  reviews: [],
  reviewCount: 0,
  error: '',
  isLoading: false,
  paginationParams: {
      page: paginationDefaultParams.page,
      limit: paginationDefaultParams.limit,
  }
}

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    setReviewsPaginationParams: (state,action) => {
      state.paginationParams = {...state.paginationParams, ...action.payload}
    }
  },
  extraReducers: builder => {
    builder.addCase(getTags.fulfilled, (state, action) => {
      state.tags = action.payload;
    })

    builder.addCase(fetchUserReviews.fulfilled, (state, action) => {
      state.reviews = action.payload.reviews;
      state.reviewCount = action.payload.totalCount;
    })

    builder.addCase(fetchLatestReviews.pending, state => {
      state.isLoading = true;
    })
    builder.addCase(fetchLatestReviews.fulfilled, (state, action) => {
      state.isLoading = false;
      state.reviews = action.payload.reviews;
      state.reviewCount = action.payload.totalCount;
    })
    builder.addCase(fetchLatestReviews.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    })
  },
})


export const reviewsReducer = reviewsSlice.reducer;
export const {setReviewsPaginationParams} = reviewsSlice.actions;