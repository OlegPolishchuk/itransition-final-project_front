import { createAsyncThunk } from '@reduxjs/toolkit';

import { apiComments } from 'apis';
import { addComment, setComments } from 'store/reducers/commentsReducer/commentsSlice';
import { incrementComments } from 'store/reducers/rewiewsReducer/reviewsSlice';
import { Comment } from 'store/types';

export const createConnection = createAsyncThunk(
  'comments/createConnection',
  (reviewId: string, { rejectWithValue, dispatch }) => {
    try {
      apiComments.createConnection(reviewId as string);

      apiComments.subscribe(
        (comments: Comment[]) => {
          dispatch(setComments(comments));
        },
        (comment: Comment) => {
          dispatch(addComment(comment));
          dispatch(incrementComments(reviewId));
        },
      );
    } catch (e) {
      return rejectWithValue(e as string);
    }
  },
);
