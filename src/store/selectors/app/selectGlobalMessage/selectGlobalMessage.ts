import { RootState } from 'store/store';

export const selectGlobalMessage = (state: RootState): string =>
  state.appReducer.globalMessage;
