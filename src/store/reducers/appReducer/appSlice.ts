import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  initializeApp,
  loginUser,
  registerUser,
  getGithubUser,
  changeLocale,
  facebookLogin,
  changeTheme,
} from 'store/actions';
import { AppState, Locale } from 'store/types';

const initialState: AppState = {
  error: '',
  isLoading: true,
  review: [],
  themeMode: 'light',
  globalMessage: '',
  locale: 'en',
  isInitialize: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    clearGlobalMessage: state => {
      state.globalMessage = '';
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setLocale: (state, action: PayloadAction<Locale>) => {
      state.locale = action.payload;
    },
  },

  extraReducers: builder => {
    builder.addCase(initializeApp.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(initializeApp.fulfilled, (state, action) => {
      state.isLoading = false;
      state.locale = action.payload.locale;
      state.themeMode = action.payload.theme;
      state.isInitialize = true;
    });
    builder.addCase(initializeApp.rejected, state => {
      state.isLoading = false;
    });

    builder.addCase(changeTheme.fulfilled, (state, action) => {
      state.themeMode = action.payload;
    });

    builder.addCase(registerUser.pending, state => {
      setPendingValues(state);
      state.globalMessage = '';
    });
    builder.addCase(
      registerUser.fulfilled,
      (state, action: PayloadAction<{ message: string }>) => {
        state.globalMessage = action.payload.message;
        state.isLoading = false;
      },
    );
    builder.addCase(registerUser.rejected, (state, action) => {
      setValuesAfterReject(state, action);
    });

    builder.addCase(loginUser.pending, state => {
      setPendingValues(state);
    });
    builder.addCase(loginUser.fulfilled, state => {
      state.isLoading = false;
      state.error = '';
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      setValuesAfterReject(state, action);
    });

    builder.addCase(facebookLogin.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(facebookLogin.fulfilled, state => {
      state.isLoading = false;
    });
    builder.addCase(facebookLogin.rejected, state => {
      state.isLoading = false;
    });

    builder.addCase(getGithubUser.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getGithubUser.fulfilled, state => {
      state.isLoading = false;
    });
    builder.addCase(getGithubUser.rejected, state => {
      state.isLoading = false;
    });

    builder.addCase(changeLocale.fulfilled, (state, action) => {
      state.locale = action.payload;
    });
  },
});

const setValuesAfterReject = <T>(state: AppState, action: PayloadAction<T>): void => {
  state.error = action.payload as string;
  state.isLoading = false;
  state.globalMessage = '';
};

const setPendingValues = (state: AppState): void => {
  state.error = '';
  state.isLoading = true;
};

export const appReducer = appSlice.reducer;
export const { clearGlobalMessage, setError, setLocale } = appSlice.actions;
