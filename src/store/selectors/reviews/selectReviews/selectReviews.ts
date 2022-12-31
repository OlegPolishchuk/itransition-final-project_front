import { RootState } from 'store/store';
import { Review } from 'store/types';

export const selectReviews = (state: RootState): Review[] => state.reviewsReducer.reviews;
