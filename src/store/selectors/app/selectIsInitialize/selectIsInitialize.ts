import { RootState } from 'store/store';

export const selectIsInitialize = (state: RootState): boolean =>
  state.appReducer.isInitialize;
