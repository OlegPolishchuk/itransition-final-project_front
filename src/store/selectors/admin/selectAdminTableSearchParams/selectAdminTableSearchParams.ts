import { RootState } from 'store/store';

export const selectAdminTableSearchParamsPage = (state: RootState): number =>
  state.adminReducer.tableSearchParams.page;

export const selectAdminTableSearchParamsLimit = (state: RootState): number =>
  state.adminReducer.tableSearchParams.limit;
