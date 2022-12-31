import { RootState } from 'store/store';

export const selectReviewCount = (state: RootState): number =>
  state.reviewsReducer.reviewCount;
