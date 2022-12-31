import { RootState } from 'store/store';

export const selectIsFirstLoading = (state: RootState): boolean =>
  state.reviewsReducer.isFirstLoading;
