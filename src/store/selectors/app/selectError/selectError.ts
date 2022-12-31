import { RootState } from 'store/store';

export const selectError = (state: RootState): string => state.appReducer.error;
