import { Locale, ThemeMode } from 'store/types';

export type AppState = {
  isLoading: boolean;
  error: string;
  review: [];
  themeMode: ThemeMode;
  globalMessage: string;
  locale: Locale;
  isInitialize: boolean;
};
