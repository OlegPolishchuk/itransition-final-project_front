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
import { User } from 'store/types';
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
    builder.addCase(loginUser.fulfilled, (state, action) => {
      setFulfilledData(state, action);
    });

    builder.addCase(getProfile.rejected, state => {
      state.isUserAuth = false;
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      setFulfilledData(state, action);
    });

    builder.addCase(refreshToken.rejected, state => {
      state.isUserAuth = false;
    });
    builder.addCase(refreshToken.fulfilled, (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    });

    builder.addCase(logoutUser.fulfilled, () => initialState);

    builder.addCase(googleLogin.fulfilled, (state, action) => {
      setFulfilledData(state, action);
    });

    builder.addCase(facebookLogin.fulfilled, (state, action) => {
      setFulfilledData(state, action);
    });

    builder.addCase(getGithubUser.fulfilled, (state, action) => {
      setFulfilledData(state, action);
    });
  },
});

const setFulfilledData = (state: AuthState, action: PayloadAction<User>): void => {
  state.isUserAuth = true;
  state.accessToken = action.payload.token;
};

export const authReducer = authSlice.reducer;
export const { setIsUserAuth } = authSlice.actions;
