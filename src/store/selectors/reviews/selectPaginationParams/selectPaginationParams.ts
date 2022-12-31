import { RootState } from 'store/store';
import { PaginationParams } from 'store/types';

export const selectPaginationParams = (state: RootState): PaginationParams =>
  state.reviewsReducer.paginationParams;
