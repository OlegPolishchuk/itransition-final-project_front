import {createSlice} from "@reduxjs/toolkit";
import {UserState} from "store/types/UserState";
import {loginUser} from "store/actions";

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
  },
})


export const userReducer = userSlice.reducer;
export const {} = userSlice.actions;