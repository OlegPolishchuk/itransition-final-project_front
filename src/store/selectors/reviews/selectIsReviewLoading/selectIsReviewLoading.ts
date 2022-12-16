import {RootState} from "store/store";

export const selectIsReviewLoading = (state: RootState) => state.reviewsReducer.isLoading;