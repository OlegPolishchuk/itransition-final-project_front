import {PaletteMode} from '@mui/material';
import {ThemeOptions} from '@mui/material/styles/createTheme';

interface CustomTheme {
  grey: ColorItem;
  primary: ColorItem;
  secondary: ColorItem;
  success: ColorItem;
  warning: ColorItem;
}

interface ColorItem {
  main: string;
  second: string;
}

// color design tokens
export const colorTokens = (mode: PaletteMode): CustomTheme => ({
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
      secondary: {
        main: '#31a2ac',
        second: '#60d9e4',
      },
      success: {
        main: '#af1c1c',
        second: '#e8514f',
      },
      warning: {
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
      secondary: {
        main: '#31a2ac',
        second: '#256a6a',
      },
      success: {
        main: '#af1c1c',
        second: '#e8514f',
      },
      warning: {
        main: '#f2df49',
        second: '#edb83d',
      },
    }),
});

// mui theme settings
export const themeSettings = (mode: PaletteMode): ThemeOptions => {
  const colors = colorTokens(mode);

  return {
    palette: {
      mode,
      ...(mode === 'dark'
        ? {
          primary: {
            main: colors.primary.main,
          },
          secondary: {
            main: colors.secondary.main,
          },
          error: {
            main: colors.success.second
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
            main: colors.secondary.main,
          },
          error: {
            main: colors.success.second
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
    components: {

      MuiTextField: {
        styleOverrides: {

          root: {
            '& label.Mui-focused': {
              color: mode === 'dark' ? 'rgba(255,255,255,.6)' : colors.primary.second,
            },
           '& .MuiOutlinedInput-root': {
             '&.Mui-focused fieldset': {
               borderColor: mode === 'dark' ? 'rgba(255,255,255,.6)' : colors.primary.second,
             },
           }
         }

        },
      },

    }
  };
};
