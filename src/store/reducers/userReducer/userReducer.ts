import {createSlice} from "@reduxjs/toolkit";
import {UserState} from "store/types/UserState";
import {loginUser, twitterLogin} from "store/actions";
import {googleLogin} from "store/actions/googleLogin";
import {getGithubUser} from "store/actions/getGithubUser";

const initialState: UserState = {
  user: {
    _id: '',
    email: '',
    token: '',
    role: 'user',
    reviews: [],
  }
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
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
export const {} = userSlice.actions;