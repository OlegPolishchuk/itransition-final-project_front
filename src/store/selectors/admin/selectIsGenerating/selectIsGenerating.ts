import { RootState } from 'store/store';

export const selectIsGenerating = (state: RootState): boolean =>
  state.adminReducer.isGenerating;
