import { RootState } from 'store/store';

export const selectIsReviewLoading = (state: RootState): boolean =>
  state.reviewsReducer.isLoading;
