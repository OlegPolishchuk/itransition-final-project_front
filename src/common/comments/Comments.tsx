import React, { memo, ReactElement } from 'react';

import { Box, Divider } from '@mui/material';

import { CommentItem } from 'common/comments/comment/CommentItem';
import { CommentGenerator } from 'common/comments/commentGenerator/CommentGenerator';
import { NothingToShow } from 'common/nothingToShow/NothingToShow';
import { useAppDispatch, useAppSelector } from 'hooks';
import { sendComment } from 'store/actions/comments/sendComment';
import { selectComments, selectIsUserAuth, selectUser } from 'store/selectors';
import { Comment } from 'store/types';

export const Comments = memo((): ReactElement => {
  const dispatch = useAppDispatch();

  const comments = useAppSelector(selectComments);
  const isUserAuth = useAppSelector(selectIsUserAuth);
  const user = useAppSelector(selectUser);

  const userRole = user.role;

  const userId = user._id;
  const userAvatar = user.avatar;
  const userName = userRole === 'admin' ? 'Admin' : user.userName;

  const handleSendComment = (comment: string): void => {
    const commentData: Comment = {
      message: comment,
      userId,
      userName,
      userAvatar,
      createdAt: new Date(),
    };

    dispatch(sendComment(commentData));
  };

  return (
    <Box>
      {isUserAuth && <CommentGenerator sendCommentCallback={handleSendComment} />}

      {comments.length ? (
        <Box my={4}>
          {comments.map((comment, index) => (
            <Box my={4} key={index}>
              <CommentItem comment={comment} />

              <Divider sx={{ my: '15px' }} />
            </Box>
          ))}
        </Box>
      ) : (
        <NothingToShow title="No comments yet" />
      )}
    </Box>
  );
});
