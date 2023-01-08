import { createSlice } from '@reduxjs/toolkit';

import { UserRole, UserStatus } from 'shared';
import {
  changeUserAvatar,
  createReview,
  facebookLogin,
  fetchUser,
  getGithubUser,
  getProfile,
  googleLogin,
  loginUser,
} from 'store/actions';
import { UserState } from 'store/types';

const initialState: UserState = {
  user: {
    _id: '',
    login: '',
    token: '',
    created: '',
    lastLogin: '',
    avatar: '',
    userName: '',
    role: UserRole.User,
    status: UserStatus.Active,
    reviewsCount: 0,
    likes: 0,
  },
  selectedUser: {
    _id: '',
    login: '',
    token: '',
    created: '',
    lastLogin: '',
    avatar: '',
    userName: '',
    role: UserRole.User,
    status: UserStatus.Active,
    reviewsCount: 0,
    likes: 0,
  },
  isLoading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getProfile.fulfilled, (state, { payload }) => {
      if (payload) {
        state.user = payload;
      }
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(googleLogin.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(facebookLogin.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(getGithubUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });

    builder.addCase(fetchUser.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.selectedUser = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchUser.rejected, state => {
      state.isLoading = false;
    });

    builder.addCase(changeUserAvatar.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(changeUserAvatar.fulfilled, (state, action) => {
      state.isLoading = false;
      state.selectedUser.avatar = action.payload.avatar;
    });
    builder.addCase(changeUserAvatar.rejected, state => {
      state.isLoading = false;
    });

    builder.addCase(createReview.fulfilled, state => {
      state.user.reviewsCount += 1;
    });
  },
});

export const userReducer = userSlice.reducer;
