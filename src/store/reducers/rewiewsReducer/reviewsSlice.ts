import {createSlice} from "@reduxjs/toolkit";
import {
  addOverallScore, addReviewImage,
  fetchMoreReviews,
  fetchUserReviews,
  getTags,
  setReviewLike
} from "store/actions";
import {paginationDefaultParams} from "shared";
import {ReviewsState} from "store/types";
import {fetchReviews} from "store/actions/reviews/fetchReviews";


const initialState: ReviewsState = {
  tags: [],
  reviews: [],
  reviewCount: 0,
  error: '',
  isLoading: false,
  isFirstLoading: true,
  paginationParams: {
      page: paginationDefaultParams.page,
      limit: paginationDefaultParams.limit,
  },
  sortType: 'created',
  uploadedImgSrc: '',
}

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    setReviewsPaginationParams: (state,action) => {
      state.paginationParams = {...state.paginationParams, ...action.payload}
    },

    setReviewsSortType: (state, action) => {
      state.sortType = action.payload;
    }

  },
  extraReducers: builder => {
    builder.addCase(getTags.fulfilled, (state, action) => {
      state.tags = action.payload;
    })

    builder.addCase(fetchUserReviews.pending, state => {
      state.isLoading = true;
    })
    builder.addCase(fetchUserReviews.fulfilled, (state, action) => {
      state.reviews = action.payload.reviews;
      state.reviewCount = action.payload.totalCount;
      state.isLoading = false;
    })
    builder.addCase(fetchUserReviews.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    })

    builder.addCase(fetchReviews.pending, state => {
      state.isLoading = true;
      state.isFirstLoading = true;
    })
    builder.addCase(fetchReviews.fulfilled, (state, action) => {
      state.isLoading = false;
      state.reviews = action.payload.reviews;
      state.reviewCount = action.payload.totalCount;
      state.isFirstLoading = false;
    })
    builder.addCase(fetchReviews.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    })

    builder.addCase(fetchMoreReviews.pending, state => {
      state.isLoading = true;
    })
    builder.addCase(fetchMoreReviews.fulfilled, (state, action) => {
      state.isLoading = false;
      state.reviews = [...state.reviews, ...action.payload.reviews];
      state.reviewCount = action.payload.totalCount;
    })
    builder.addCase(fetchMoreReviews.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    })

    builder.addCase(setReviewLike.fulfilled, (state, action) => {
      state.reviews = state.reviews.map(review => {
        return  review._id === action.payload.review._id ? action.payload.review : review })
    })

    builder.addCase(addOverallScore.fulfilled, (state, action) => {
      state.reviews = state.reviews.map(review => {
        return  review._id === action.payload.review._id ? action.payload.review : review })
    })

    builder.addCase(addReviewImage.fulfilled, (state, action) => {
      state.uploadedImgSrc = state.uploadedImgSrc.concat(` ${action.payload.imgSrc}`)
    })
  },
})


export const reviewsReducer = reviewsSlice.reducer;
export const {setReviewsPaginationParams, setReviewsSortType} = reviewsSlice.actions;