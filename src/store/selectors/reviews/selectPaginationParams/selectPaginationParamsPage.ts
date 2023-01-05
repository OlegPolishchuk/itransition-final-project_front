import { RootState } from 'store/store';

export const selectPaginationParamsPage = (state: RootState): number =>
  state.reviewsReducer.paginationParams.page;
