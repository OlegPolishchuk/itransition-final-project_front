export type InitialState = {
  isLoading: boolean;
  error: string;
  review: [];
  themeMode: ThemeMode;
  isUserAuth: boolean;
}

export type ThemeMode = 'light' | 'dark';