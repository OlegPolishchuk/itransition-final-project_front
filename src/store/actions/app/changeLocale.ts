import { createAsyncThunk } from '@reduxjs/toolkit';

import { localStorageService } from 'services';
import { Locale } from 'store/types';

export const changeLocale = createAsyncThunk(
  'app/changeLocale',
  async (locale: Locale) => {
    await localStorageService.setItem('locale', locale);

    return locale;
  },
);
