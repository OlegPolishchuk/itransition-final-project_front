import { Locale } from 'store/types/locale';
import { ThemeMode } from 'store/types/themeMode';

export type InitializeApp = {
  theme: ThemeMode;
  locale: Locale;
  accessToken: string;
};
