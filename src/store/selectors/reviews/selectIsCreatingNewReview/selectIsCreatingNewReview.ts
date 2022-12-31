import { RootState } from 'store/store';

export const selectIsCreatedNewReview = (state: RootState): boolean =>
  state.reviewsReducer.isCreatedNewOne;
