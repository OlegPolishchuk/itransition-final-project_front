import {ThemeMode} from "store/types/themeMode";
import {Locale} from "store/types/locale";

export type InitializeApp = {
  theme: ThemeMode;
  locale: Locale;
  accessToken: string;
}