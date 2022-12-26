import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiComments} from "apis/comments/apiComments";
import {Comment} from "store/types";
import {addComment, setComments} from "store/reducers/commentsReducer/commentsSlice";

export const createConnection = createAsyncThunk(
  'comments/createConnection',
  ({userId, reviewId}: {userId: string, reviewId: string}, {rejectWithValue, dispatch}) => {

    try {
      apiComments.createConnection(userId, reviewId as string);

      apiComments.subscribe(
        (comments: Comment[]) => {
          console.log('user connected to room')
          dispatch(setComments(comments))
        },
        (comment: Comment) => {
          console.log('qwfeqwef')
          dispatch(addComment(comment))
        }
      )
    }
    catch (e) {
      return rejectWithValue(e as string)
    }

  }
)
