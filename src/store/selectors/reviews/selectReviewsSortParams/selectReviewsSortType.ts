import { RootState } from 'store/store';
import { ReviewSortType } from 'store/types';

export const selectReviewsSortType = (state: RootState): ReviewSortType =>
  state.reviewsReducer.sortType;
