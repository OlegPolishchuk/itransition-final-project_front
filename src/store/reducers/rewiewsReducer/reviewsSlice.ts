import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { paginationDefaultParams } from 'shared';
import {
  addOverallScore,
  addReviewImage,
  createReview,
  fetchMoreReviews,
  fetchUserReviews,
  getTags,
  setReviewLike,
  updateReview,
} from 'store/actions';
import { fetchReviews } from 'store/actions/reviews/fetchReviews';
import {
  FetchReviewsResponse,
  PaginationParams,
  Review,
  ReviewSortType,
  ReviewsState,
} from 'store/types';

const initialState: ReviewsState = {
  tags: [],
  reviews: [],
  editableReview: null,
  reviewCount: 0,
  error: '',
  isLoading: true,
  isFirstLoading: true,
  paginationParams: {
    page: paginationDefaultParams.page,
    limit: paginationDefaultParams.limit,
  },
  sortType: 'created',
  uploadedImgSrc: '',
  isCreatedNewOne: false,
};

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    setReviewsPaginationParams: (state, action: PayloadAction<PaginationParams>) => {
      state.paginationParams = { ...state.paginationParams, ...action.payload };
    },

    setReviewsSortType: (state, action: PayloadAction<ReviewSortType>) => {
      state.sortType = action.payload;
    },

    setIsCreatedNewReview: (state, action: PayloadAction<boolean>) => {
      state.isCreatedNewOne = action.payload;
    },

    setEditableReview: (state, action: PayloadAction<Review | null>) => {
      state.editableReview = action.payload;
    },

    incrementComments: (state, action: PayloadAction<string>) => {
      state.reviews.map(review =>
        review._id === action.payload ? (review.comments += 1) : review,
      );
    },
  },
  extraReducers: builder => {
    builder.addCase(getTags.fulfilled, (state, action) => {
      state.tags = action.payload;
    });
    builder.addCase(getTags.rejected, (state, action) => {
      setRejectedData(state, action);
    });

    builder.addCase(fetchUserReviews.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchUserReviews.fulfilled, (state, action) => {
      setFulfilledReviewsData(state, action);
    });
    builder.addCase(fetchUserReviews.rejected, (state, action) => {
      setRejectedData(state, action);
    });

    builder.addCase(fetchReviews.pending, state => {
      state.isLoading = true;
      state.isFirstLoading = true;
    });
    builder.addCase(fetchReviews.fulfilled, (state, action) => {
      setFulfilledReviewsData(state, action);
      state.isFirstLoading = false;
    });
    builder.addCase(fetchReviews.rejected, (state, action) => {
      setRejectedData(state, action);
    });

    builder.addCase(fetchMoreReviews.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchMoreReviews.fulfilled, (state, action) => {
      state.isLoading = false;
      state.reviews = [...state.reviews, ...action.payload.reviews];
      state.reviewCount = action.payload.totalCount;
    });
    builder.addCase(fetchMoreReviews.rejected, (state, action) => {
      setRejectedData(state, action);
    });

    builder.addCase(setReviewLike.fulfilled, (state, action) => {
      state.reviews.forEach((review, index) => {
        if (review._id === action.payload.review._id) {
          state.reviews[index] = action.payload.review;
        }

        if (review.userId === action.payload.review.userId) {
          review.userLikes = action.payload.review.userLikes;
        }
      });
    });

    builder.addCase(addOverallScore.fulfilled, (state, action) => {
      state.reviews = state.reviews.map(review => {
        return review._id === action.payload.review._id ? action.payload.review : review;
      });
    });

    builder.addCase(addReviewImage.fulfilled, (state, action) => {
      state.uploadedImgSrc = state.uploadedImgSrc.concat(` ${action.payload.imgSrc}`);
    });

    builder.addCase(createReview.pending, state => {
      state.isCreatedNewOne = false;
    });
    builder.addCase(createReview.fulfilled, state => {
      state.isCreatedNewOne = true;
    });
    builder.addCase(createReview.rejected, state => {
      state.isCreatedNewOne = false;
    });

    builder.addCase(updateReview.pending, state => {
      state.isCreatedNewOne = false;
    });
    builder.addCase(updateReview.fulfilled, state => {
      state.isCreatedNewOne = true;
    });
    builder.addCase(updateReview.rejected, state => {
      state.isCreatedNewOne = false;
    });
  },
});

const setRejectedData = <T>(state: ReviewsState, action: PayloadAction<T>): void => {
  state.isLoading = false;
  state.error = action.payload as string;
};

const setFulfilledReviewsData = (
  state: ReviewsState,
  action: PayloadAction<FetchReviewsResponse>,
): void => {
  state.isLoading = false;
  state.reviews = action.payload.reviews;
  state.reviewCount = action.payload.totalCount;
};

export const reviewsReducer = reviewsSlice.reducer;
export const {
  setReviewsPaginationParams,
  setReviewsSortType,
  setIsCreatedNewReview,
  setEditableReview,
  incrementComments,
} = reviewsSlice.actions;
