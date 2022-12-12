import {createSlice} from "@reduxjs/toolkit";
import {UserState} from "store/types/UserState";
import {getProfile, loginUser, twitterLogin} from "store/actions";
import {googleLogin} from "store/actions/auth/googleLogin";
import {getGithubUser} from "store/actions/auth/getGithubUser";
import {userRoles} from "shared";

const initialState: UserState = {
  user: {
    _id: '',
    login: '',
    token: '',
    created: '',
    lastLogin: '',
    avatar: '',
    userName: '',
    role: userRoles.user,
    status: 'active',
    reviewsCount: 0,
  },
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getProfile.fulfilled, (state, {payload}) => {
      if (payload) {
        state.user = payload;
      }
    })
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload;
    })
    builder.addCase(googleLogin.fulfilled, (state, action) => {
      state.user = action.payload;
    })
    builder.addCase(twitterLogin.fulfilled, (state, action) => {
      state.user = action.payload;
    })
    builder.addCase(getGithubUser.fulfilled, (state,action) => {
      state.user = action.payload;
    })
  },
})

export const userReducer = userSlice.reducer;