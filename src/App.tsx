import React, {useEffect} from 'react';
import {Login} from "app/login/Login";
import {ThemeProvider} from "@mui/material";
import {useMode} from "hooks/useTheme";
import { ColorModeContext } from 'theme';


function App() {
  const [theme, colorMode] = useMode();

  return (
    <div className="App">
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <Login />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </div>
  );
}

export default App;
