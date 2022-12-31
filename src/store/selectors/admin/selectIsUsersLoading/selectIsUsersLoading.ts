import { RootState } from 'store/store';

export const selectIsUsersLoading = (state: RootState): boolean =>
  state.adminReducer.isLoading;
