import {RootState} from "store/store";

export const selectLocale = (state: RootState) => state.appReducer.locale;