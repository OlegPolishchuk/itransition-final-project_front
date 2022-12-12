import {createSlice} from "@reduxjs/toolkit";
import {getTags} from "store/actions";
import {fetchUser} from "store/actions/users";
import {Review} from "store/types/Review";

type InitialState = {
  reviews: Review[];
  tags: string[];
}

const initialState: InitialState = {
  tags: [],
  reviews: [],
}

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getTags.fulfilled, (state, action) => {
      state.tags = action.payload;
    })

    builder.addCase(fetchUser.fulfilled, (state,action) => {
      state.reviews = action.payload.reviews;
    })
  },
})


export const reviewsReducer = reviewsSlice.reducer;