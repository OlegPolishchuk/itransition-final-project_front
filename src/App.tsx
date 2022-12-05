import React, {useEffect} from 'react';
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {themeSettings} from 'theme';
import {useAppDispatch, useAppSelector} from "hooks";
import {selectAccessToken, selectIsUserAuth, selectThemeMode} from "store/selectors";
import {Header} from "common";
import {AppRoutes} from "pages";
import {getProfile} from "store/actions";


export function App() {
  const dispatch = useAppDispatch();

  const themeMode = useAppSelector(selectThemeMode);
  const isUserAuth = useAppSelector(selectIsUserAuth);
  const token = useAppSelector(selectAccessToken);

  const theme = createTheme(themeSettings(themeMode));

  useEffect(() => {
    dispatch(getProfile(token));
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>

      <div className={'App'}>

        <Header themeMode={themeMode} isUserAuth={isUserAuth} />

        <AppRoutes isUserAuth={isUserAuth}/>

      </div>
    </ThemeProvider>
  );
}

