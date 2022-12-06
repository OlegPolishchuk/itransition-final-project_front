import {Locale, ThemeMode} from "store/types/AppState";

export type InitializeApp = {
  theme: ThemeMode;
  locale: Locale;
  accessToken: string;
}