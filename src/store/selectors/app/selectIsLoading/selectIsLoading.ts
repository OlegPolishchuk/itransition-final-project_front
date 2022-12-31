import { RootState } from 'store/store';

export const selectIsLoading = (state: RootState): boolean => state.appReducer.isLoading;
