import { createAsyncThunk } from '@reduxjs/toolkit';

import { localStorageService } from 'services';
import { localStorageData } from 'shared';
import { RootState } from 'store/store';
import { ThemeMode } from 'store/types';

export const changeTheme = createAsyncThunk<ThemeMode, void, { state: RootState }>(
  'app/toggleTheme',
  (_, { getState }) => {
    const theme = getState().appReducer.themeMode;
    const updatedTheme = theme === 'dark' ? 'light' : 'dark';

    localStorageService.setItem(localStorageData.theme, updatedTheme);

    return updatedTheme;
  },
);
