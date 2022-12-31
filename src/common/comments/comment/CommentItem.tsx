import React, { FC } from 'react';

import { Avatar, Box, Typography } from '@mui/material';

import { BaseNavLink } from 'common/baseNavLink/BaseNavLink';
import { useThemeColors } from 'hooks';
import { parseDate, routes } from 'shared';
import { Comment } from 'store/types';

type Props = {
  comment: Comment;
};

export const CommentItem: FC<Props> = ({ comment }) => {
  const colors = useThemeColors();

  return (
    <Box>
      <Box display="flex" gap="15px">
        <Avatar
          alt={comment.userName}
          src={comment.userAvatar}
          sx={{ width: '50px', height: '50px' }}
        />

        <Box flexGrow={1}>
          <Typography>
            <BaseNavLink to={`${routes.profile.base}/${comment.userId}`}>
              {comment.userName}
            </BaseNavLink>
          </Typography>

          <Typography sx={{ color: colors.grey.main, fontSize: '12px' }}>
            {parseDate(`${comment.createdAt}`)}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ fontStyle: 'italic', mt: '15px' }}>{comment.message}</Box>
    </Box>
  );
};
