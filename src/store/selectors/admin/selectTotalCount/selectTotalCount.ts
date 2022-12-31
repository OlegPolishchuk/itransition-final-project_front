import { RootState } from 'store/store';

export const selectTotalCount = (state: RootState): number =>
  state.adminReducer.totalCount;
