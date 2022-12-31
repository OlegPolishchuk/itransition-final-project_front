import { RootState } from 'store/store';
import { Comment } from 'store/types';

export const selectComments = (state: RootState): Comment[] =>
  state.commentsReducer.comments;
