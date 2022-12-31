import { RootState } from 'store/store';

export const selectAccessToken = (state: RootState): string =>
  state.authReducer.accessToken;
