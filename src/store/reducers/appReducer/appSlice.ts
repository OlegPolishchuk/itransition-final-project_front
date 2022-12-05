import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppState} from "store/types/AppState";
import {registerUser, loginUser} from "store/actions";

const initialState: AppState = {
  error: '',
  isLoading: false,
  review: [],
  themeMode: 'light',
  globalMessage: '',
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
  },

  extraReducers: builder => {
    builder.addCase(registerUser.pending, (state) => {
      state.error = '';
      state.isLoading = true;
    })

    builder.addCase(registerUser.fulfilled, (state, action: PayloadAction<{message: string}>) => {
      state.globalMessage = action.payload.message;
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
    builder.addCase(loginUser.rejected, (state, action) => {
      state.error = action.payload as string;
      state.isLoading = false;
      state.globalMessage = '';
    })
  }
})


export const appReducer = appSlice.reducer;
export const {toggleTheme, clearGlobalMessage, setError} = appSlice.actions;