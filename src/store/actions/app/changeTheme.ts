import {createAsyncThunk} from "@reduxjs/toolkit";
import {RootState} from "store/store";
import {localStorageService} from "services";
import {localStorageData} from "shared";
import {toggleTheme} from "store/reducers";

export const changeTheme = createAsyncThunk<void, void, {state: RootState}>(
  'app/toggleTheme', (_, {getState, dispatch}) => {
    const theme = getState().appReducer.themeMode;
    const updatedTheme = theme === 'dark' ? 'light': 'dark';

    localStorageService.setItem(localStorageData.theme, updatedTheme);
    dispatch(toggleTheme())
  }
)