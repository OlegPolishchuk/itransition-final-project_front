import {createAsyncThunk} from "@reduxjs/toolkit";
import {Locale} from "store/types";
import {localStorageService} from "services";

export const changeLocale = createAsyncThunk(
  'app/changeLocale', async (locale: Locale) => {

    await localStorageService.setItem('locale', locale);

    return locale;
  }
)