import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  facebookLogin,
  getGithubUser,
  getProfile,
  googleLogin,
  initializeApp,
  loginUser,
  logoutUser,
  refreshToken,
  registerUser,
} from 'store/actions';
import { AuthState } from 'store/types/initialStates/AuthState';

const initialState: AuthState = {
  error: '',
  accessToken: '',
  isUserAuth: false,
};

const authSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIsUserAuth: (state, action: PayloadAction<boolean>) => {
      state.isUserAuth = action.payload;
    },
  },

  extraReducers: builder => {
    builder.addCase(initializeApp.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.error = '';
    });

    builder.addCase(registerUser.rejected, (state, action) => {
      state.error = action.payload?.message as string;
    });

    builder.addCase(loginUser.pending, state => {
      state.error = '';
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.isUserAuth = true;
      state.accessToken = payload.token;
    });

    builder.addCase(getProfile.rejected, state => {
      state.isUserAuth = false;
    });
    builder.addCase(getProfile.fulfilled, (state, { payload }) => {
      if (payload) {
        state.accessToken = payload.token;
        state.isUserAuth = true;
      }
    });

    builder.addCase(refreshToken.rejected, state => {
      state.isUserAuth = false;
    });
    builder.addCase(refreshToken.fulfilled, (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    });

    builder.addCase(logoutUser.fulfilled, () => initialState);

    builder.addCase(googleLogin.fulfilled, (state, { payload }) => {
      state.isUserAuth = true;
      state.accessToken = payload.token;
    });

    builder.addCase(facebookLogin.fulfilled, (state, { payload }) => {
      state.isUserAuth = true;
      state.accessToken = payload.token;
    });

    builder.addCase(getGithubUser.fulfilled, (state, { payload }) => {
      state.isUserAuth = true;
      state.accessToken = payload.token;
    });
  },
});

export const authReducer = authSlice.reducer;
export const { setIsUserAuth } = authSlice.actions;
