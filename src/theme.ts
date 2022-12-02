import {createContext} from 'react';

import {PaletteMode} from '@mui/material';
import {ThemeOptions} from '@mui/material/styles/createTheme';

interface CustomTheme {
  grey: ColorItem;
  primary: ColorItem;
  turquoise: ColorItem;
  red: ColorItem;
  yellow: ColorItem;
}

interface ColorItem {
  main: string;
  second: string;
}

// color design tokens
export const tokens = (mode: PaletteMode): CustomTheme => ({
  ...(mode === 'dark'
    ? {
      grey: {
        main: '#c2c2c2',
        second: '#858585',
      },
      primary: {
        // second: '#727169',
        // main: '#2f2f28',
        second: '#727169',
        main: '#2f2f28',
      },
      turquoise: {
        main: '#31a2ac',
        second: '#60d9e4',
      },
      red: {
        main: '#af1c1c',
        second: '#e8514f',
      },
      yellow: {
        main: '#edb83d',
        second: '#f1cf45'
      },
    }
    : {
      grey: {
        main: '#a3a3a3',
        second: '#e0e0e0',
      },
      primary: {
        second: '#727169',
        main: '#2f2f28',
      },
      turquoise: {
        main: '#3ac8d9',
        second: '#60d9e4',
      },
      red: {
        main: '#af1c1c',
        second: '#e8514f',
      },
      yellow: {
        main: '#f2df49',
        second: '#edb83d',
      },
    }),
});

// mui theme settings
export const themeSettings = (mode: PaletteMode): ThemeOptions => {
  const colors = tokens(mode);

  return {
    palette: {
      mode,
      ...(mode === 'dark'
        ? {
          primary: {
            main: colors.primary.main,
          },
          secondary: {
            main: colors.turquoise.main,
          },
          error: {
            main: colors.red.second
          },
          neutral: {
            main: colors.grey.second,
            light: colors.grey.main,
          },
          background: {
            default: colors.primary.main,
          },
        }
        : {
          primary: {
            main: colors.primary.main,
          },
          secondary: {
            main: colors.turquoise.main,
          },
          error: {
            main: colors.red.second
          },
          neutral: {
            main: colors.grey.main,
            light: colors.grey.second,
          },
          background: {
            default: '#fcfcfc',
          },
        }),
    },
    typography: {
      fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
      fontSize: 12,
      h1: {
        fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
        fontSize: 40,
      },
      h2: {
        fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
        fontSize: 32,
      },
      h3: {
        fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
        fontSize: 24,
      },
      h4: {
        fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
        fontSize: 20,
      },
      h5: {
        fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
        fontSize: 16,
      },
      h6: {
        fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
        fontSize: 14,
      },
    },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {
  },
});
