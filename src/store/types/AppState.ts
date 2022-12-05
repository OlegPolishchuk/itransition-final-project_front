export type AppState = {
  isLoading: boolean;
  error: string;
  review: [];
  themeMode: ThemeMode;
  globalMessage: string;
}


export type ThemeMode = 'light' | 'dark';