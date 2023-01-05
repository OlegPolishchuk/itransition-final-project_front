import { RootState } from 'store/store';

export const selectPaginationParamsLimit = (state: RootState): number =>
  state.reviewsReducer.paginationParams.limit;
