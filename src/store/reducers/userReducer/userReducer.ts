import {createSlice} from "@reduxjs/toolkit";
import {UserState} from "store/types/initialStates/UserState";
import {
  changeUserAvatar,
  fetchUser,
  getProfile,
  loginUser,
  twitterLogin
} from "store/actions";
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
    role: userRoles.user,
    status: 'active',
    reviewsCount: 0,
    likes: 0,
  },
  isLoading: false,
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

    builder.addCase(fetchUser.pending, state => {
      state.isLoading = true;
    })
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.selectedUser = action.payload;
      state.isLoading = false;
    })
    builder.addCase(fetchUser.rejected, state => {
      state.isLoading = false;
    })

    builder.addCase(changeUserAvatar.pending, state => {
      state.isLoading = true
    })
    builder.addCase(changeUserAvatar.fulfilled, (state, action) => {
      state.isLoading = false;
      state.selectedUser.avatar = action.payload.avatar;
    })
    builder.addCase(changeUserAvatar.rejected, state => {
      state.isLoading = false;
    })

  },
})

export const userReducer = userSlice.reducer;