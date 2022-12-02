export type InitialState = {
  isLoading: boolean;
  error: string;
  review: [];
  themeMode: ThemeMode;
}

export type ThemeMode = 'light' | 'dark';