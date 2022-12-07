import {createAsyncThunk} from "@reduxjs/toolkit";
import {localStorageService} from "services";
import {Locale, ThemeMode} from "store/types/AppState";
import {getStartToken, localStorageData} from "shared";
import {getProfile} from "store/actions/auth";
import {InitializeApp} from "store/types/InitializeApp";

export const initializeApp = createAsyncThunk<InitializeApp, void>(
  'app/initializeApp',  async (_, {dispatch}) => {

    console.log(`initialize APP`)
    const locale =  localStorageService.getItem(localStorageData.locale) as Locale  || 'en';
    const theme = localStorageService.getItem(localStorageData.theme) as ThemeMode || 'light';
    const accessToken = getStartToken();

    console.log(`accessToken`, accessToken)
    await dispatch(getProfile(accessToken));


    return {locale, theme, accessToken}
  }
)