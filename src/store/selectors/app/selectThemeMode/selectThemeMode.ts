import { RootState } from 'store/store';
import { ThemeMode } from 'store/types';

export const selectThemeMode = (state: RootState): ThemeMode =>
  state.appReducer.themeMode;
