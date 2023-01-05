import React, { ReactElement, useEffect } from 'react';

import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';

import { Header, MainLoader } from 'common';
import { useAppDispatch, useAppSelector } from 'hooks';
import { AppRoutes } from 'pages';
import { locales } from 'shared';
import enMessages from 'shared/localizations/en.json';
import ruMessages from 'shared/localizations/ru.json';
import { initializeApp } from 'store/actions';
import {
  selectIsInitialize,
  selectIsLoading,
  selectIsUserAuth,
  selectLocale,
  selectThemeMode,
  selectUserRole,
} from 'store/selectors';
import { themeSettings } from 'theme';

const messages = {
  [locales.EN]: enMessages,
  [locales.RU]: ruMessages,
};

export const App = (): ReactElement => {
  const dispatch = useAppDispatch();

  const themeMode = useAppSelector(selectThemeMode);
  const isUserAuth = useAppSelector(selectIsUserAuth);
  const locale = useAppSelector(selectLocale);
  const isLoading = useAppSelector(selectIsLoading);
  const userRole = useAppSelector(selectUserRole);
  const isInitialize = useAppSelector(selectIsInitialize);

  const theme = createTheme(themeSettings(themeMode));

  console.log('app rendered');
  useEffect(() => {
    dispatch(initializeApp());
  }, []);

  return (
    <BrowserRouter>
      <IntlProvider locale={locale} messages={messages[locale]}>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          {isInitialize ? (
            <div className="App">
              <Header themeMode={themeMode} />

              <AppRoutes
                isUserAuth={isUserAuth}
                userRole={userRole}
                isInitialize={isInitialize}
              />
            </div>
          ) : (
            <MainLoader />
          )}

          {isLoading && <MainLoader />}
        </ThemeProvider>
      </IntlProvider>
    </BrowserRouter>
  );
};
