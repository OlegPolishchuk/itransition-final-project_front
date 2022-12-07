import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppState, Locale} from "store/types/AppState";
import {initializeApp, loginUser, registerUser, twitterLogin} from "store/actions";
import {getGithubUser} from "store/actions/auth/getGithubUser";
import {changeLocale} from "store/actions/app/changeLocale";

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
    toggleTheme: (state) => {
      state.themeMode = state.themeMode === 'light' ? 'dark' : 'light';
    },
    clearGlobalMessage: (state) => {
      state.globalMessage = '';
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setLocale: (state, action: PayloadAction<Locale>) => {
      state.locale = action.payload;
    }
  },

  extraReducers: builder => {
    builder.addCase(initializeApp.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(initializeApp.fulfilled, (state, action) => {
      state.isLoading = false;
      state.locale = action.payload.locale;
      state.themeMode = action.payload.theme;
      state.isInitialize = true;
    })
    builder.addCase(initializeApp.rejected, (state) => {
      state.isLoading = false;
    })

    builder.addCase(registerUser.pending, (state) => {
      state.error = '';
      state.isLoading = true;
      state.globalMessage = '';
    })
    builder.addCase(registerUser.fulfilled, (state, action: PayloadAction<{ message: string }>) => {
      state.globalMessage = action.payload.message;
      state.isLoading = false;
    })
    builder.addCase(registerUser.rejected, (state, action) => {
      state.error = action.payload?.message as string;
      state.isLoading = false;
      state.globalMessage = '';
    })

    builder.addCase(loginUser.pending, (state) => {
      state.error = '';
      state.isLoading = true;
    })
    builder.addCase(loginUser.fulfilled, state => {
      state.isLoading = false;
      state.error = '';
    })
    builder.addCase(loginUser.rejected, (state, action) => {
      state.error = action.payload as string;
      state.isLoading = false;
      state.globalMessage = '';
    })

    builder.addCase(twitterLogin.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(twitterLogin.fulfilled, state => {state.isLoading = false})
    builder.addCase(twitterLogin.rejected, state => {state.isLoading = false})

    builder.addCase(getGithubUser.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getGithubUser.fulfilled, (state) => {
      state.isLoading = false;
    })
    builder.addCase(getGithubUser.rejected, (state) => {
      state.isLoading = false
    })

    builder.addCase(changeLocale.fulfilled, (state, action) => {
      state.locale = action.payload;
    })
  }
})


export const appReducer = appSlice.reducer;
export const {
  toggleTheme,
  clearGlobalMessage,
  setError,
  setLocale,
} = appSlice.actions;