import { Comment } from 'store/types';

export type CommentsState = {
  comments: Comment[];
  reviewId: string;
  isLoading: boolean;
};
