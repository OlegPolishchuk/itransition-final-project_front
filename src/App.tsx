import React, {useEffect} from 'react';
import {Login} from "app/login/Login";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
// import {useMode} from "hooks/useTheme";
import {themeSettings} from 'theme';
import {useAppSelector} from "hooks";
import {selectThemeMode} from "store/selectors";
import {Header} from "common/header/Header";
import {selectIsUserAuth} from "store/selectors/app";
import {AppRoutes} from "app/appRoutes/AppRoutes";


function App() {
  // const [theme, colorMode] = useMode();
  const themeMode = useAppSelector(selectThemeMode);
  const isUserAuth = useAppSelector(selectIsUserAuth);

  const theme = createTheme(themeSettings(themeMode));


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>

      <div className={'App'}>

        <Header themeMode={themeMode} />

        <AppRoutes isUserAuth={isUserAuth}/>

      </div>
    </ThemeProvider>
  );
}

export default App;
