import React, {FC} from 'react';
import {useAppDispatch, useAppSelector} from "hooks";
import {selectComments} from "store/selectors";
import {Box, Divider} from "@mui/material";
import {CommentGenerator} from "common/comments/commentGenerator/CommentGenerator";
import {CommentItem} from "common/comments/comment/CommentItem";
import {NothingToShow} from "common/nothingToShow/NothingToShow";
import {sendComment} from "store/actions/comments/sendComment";
import {Comment} from "store/types";


type Props = {
  userId: string;
  userAvatar: string;
  userName: string;
}

export const Comments: FC<Props> = ({ userId, userName, userAvatar}) => {
  const dispatch = useAppDispatch();

  const comments = useAppSelector(selectComments);

  const handleSendComment = (comment: string) => {
    const commentData: Comment = {
      message: comment,
      userId,
      userName,
      userAvatar,
      createdAt: new Date(),
    }
    dispatch(sendComment(commentData))
  }


  return (
    <Box>

        <CommentGenerator sendCommentCallback={handleSendComment} />

      {comments.length
      ? (
          <Box my={4}>
            {comments.map((comment, index) => (
              <Box my={4}>
                <CommentItem
                  key={index}
                  comment={comment}
                />

                <Divider sx={{my:'15px'}}/>
              </Box>
            ))}
          </Box>
        )
      : <NothingToShow title={'No comments yet'} />
      }

    </Box>
  );
};
