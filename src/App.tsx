import React, {useEffect} from 'react';
import {BrowserRouter} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "hooks";

import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {themeSettings} from 'theme';

import {
  selectIsInitialize,
  selectIsLoading,
  selectIsUserAuth,
  selectLocale,
  selectThemeMode,
  selectUserRole
} from "store/selectors";
import {initializeApp} from "store/actions";

import {Header, Loader} from "common";
import {AppRoutes} from "pages";


import {IntlProvider} from "react-intl";
import {locales} from "shared";
import * as enMessages from 'shared/localizations/en.json';
import ruMessages from 'shared/localizations/ru.json';

const messages = {
  [locales.EN]: enMessages,
  [locales.RU]: ruMessages,
}


export function App() {
  const dispatch = useAppDispatch();

  const themeMode = useAppSelector(selectThemeMode);
  const isUserAuth = useAppSelector(selectIsUserAuth);
  const locale = useAppSelector(selectLocale);
  const isLoading = useAppSelector(selectIsLoading);
  const userRole = useAppSelector(selectUserRole);
  const isInitialize = useAppSelector(selectIsInitialize);

  const theme = createTheme(themeSettings(themeMode))

  useEffect(() => {
    dispatch(initializeApp());
  }, [])

  return (
    <BrowserRouter>
      <IntlProvider locale={locale} messages={messages[locale]}>
        <ThemeProvider theme={theme}>
          <CssBaseline/>

          {isInitialize
          ? (
              <div className={'App'}>

                <Header themeMode={themeMode} isUserAuth={isUserAuth}/>

                <AppRoutes
                  isUserAuth={isUserAuth}
                  userRole={userRole}
                  isInitialize={isInitialize}
                />

              </div>
            )
          : <Loader />
          }

          {isLoading && <Loader />}
        </ThemeProvider>
      </IntlProvider>
    </BrowserRouter>
  );
}

