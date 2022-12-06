export type AppState = {
  isLoading: boolean;
  error: string;
  review: [];
  themeMode: ThemeMode;
  globalMessage: string;
  locale: Locale;
  isInitialize: boolean;
}


export type ThemeMode = 'light' | 'dark';
export type Locale = 'en' | 'ru';