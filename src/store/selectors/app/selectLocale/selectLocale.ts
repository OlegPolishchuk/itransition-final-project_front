import { RootState } from 'store/store';
import { Locale } from 'store/types';

export const selectLocale = (state: RootState): Locale => state.appReducer.locale;
