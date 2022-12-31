import { RootState } from 'store/store';

export const selectTags = (state: RootState): string[] => state.reviewsReducer.tags;
