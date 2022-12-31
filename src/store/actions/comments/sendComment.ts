import { createAsyncThunk } from '@reduxjs/toolkit';

import { apiComments } from 'apis';
import { Comment } from 'store/types';

export const sendComment = createAsyncThunk(
  'comments/sendComment',
  (comment: Comment) => {
    apiComments.sendComment(comment);
  },
);
