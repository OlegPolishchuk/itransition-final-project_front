import { RootState } from 'store/store';

export const selectIsUserLoading = (state: RootState): boolean =>
  state.userReducer.isLoading;
