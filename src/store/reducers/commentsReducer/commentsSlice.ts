import {createSlice} from "@reduxjs/toolkit";
import {CommentsState} from "store/types";

const initialState: CommentsState = {
  comments: [],
  reviewId: '',
  isLoading: true,
}

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action) => {
      state.comments = action.payload;
    },

    addComment: (state, action) => {
      console.log(action.payload)
      state.comments.push(action.payload)
    }
  },
})


export const commentsReducer = commentsSlice.reducer;

export const {setComments, addComment} = commentsSlice.actions;