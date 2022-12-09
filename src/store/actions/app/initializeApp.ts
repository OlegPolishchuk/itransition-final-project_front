import {createAsyncThunk} from "@reduxjs/toolkit";
import {localStorageService} from "services";
import {Locale, ThemeMode} from "store/types/AppState";
import {getStartToken, localStorageData} from "shared";
import {getProfile} from "store/actions/auth";
import {InitializeApp} from "store/types/InitializeApp";

export const initializeApp = createAsyncThunk<InitializeApp, void>(
  'app/initializeApp',  async (_, {dispatch}) => {

    const locale = await localStorageService.getItem(localStorageData.locale) as Locale  || 'en';
    const theme = await localStorageService.getItem(localStorageData.theme) as ThemeMode || 'light';
    const accessToken = getStartToken();

    await dispatch(getProfile(accessToken));

    return {locale, theme, accessToken}
  }
)