import {useMemo, useState} from "react";
import {createTheme, PaletteMode, Theme} from "@mui/material";
import {themeSettings} from "theme";


export const useMode = (): [Theme, {toggleColorMode: () => void}] => {
  const [mode, setMode] = useState<PaletteMode>('light');

  const colorMode = useMemo( () => ({
    toggleColorMode: () => setMode(prev => (prev === 'light' ? 'dark' : 'light'))
  }), [])

  const theme = useMemo( () => createTheme(themeSettings(mode)), [mode])

  return [theme, colorMode];
}