import { RootState } from 'store/store';
import { Review } from 'store/types';

export const selectEditableReview = (state: RootState): Review | null =>
  state.reviewsReducer.editableReview;
