import React, { FC } from 'react';

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { Avatar, Box, Tooltip, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { BaseNavLink } from 'common/baseNavLink/BaseNavLink';
import { PersonalScore } from 'common/scores';
import { useThemeColors } from 'hooks';
import { getReviewHeaderGroupTitle, parseDate, routes } from 'shared';

type Props = {
  userName: string;
  userAvatar: string;
  created: string;
  userId: string;
  userLikes: number;
  subtitle: string;
  personalScore: number;
  group: string;
};

export const ReviewItemHeader: FC<Props> = ({
  userName,
  userAvatar,
  created,
  userId,
  userLikes,
  subtitle,
  personalScore,
  group,
}) => {
  const colors = useThemeColors();

  const footerItemStyle = {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px',
    gap: '8px',
  };

  return (
    <Box
      sx={{
        padding: '10px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: '15px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Avatar
              sx={{ width: '50px', height: '50px' }}
              alt={userName}
              src={userAvatar}
            />

            <Tooltip title={<FormattedMessage id="app.user-score.tooltip.title" />}>
              <Box sx={footerItemStyle}>
                <FavoriteBorderOutlinedIcon
                  color="disabled"
                  sx={{ width: '15px', height: '15px' }}
                />

                <Typography component="span" color={colors.warning.main}>
                  {userLikes || 0}
                </Typography>
              </Box>
            </Tooltip>
          </Box>
        </Box>

        <Box flexGrow={1}>
          <Typography>
            <BaseNavLink to={`${routes.profile.base}/${userId}`}>{userName}</BaseNavLink>
          </Typography>

          <Box
            sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}
          >
            <Typography
              component="div"
              variant="subtitle2"
              sx={{ color: colors.grey.main }}
            >
              <FormattedMessage id={getReviewHeaderGroupTitle(group)} />
              <Typography component="span" variant="h4" sx={{ marginLeft: '10px' }}>
                <BaseNavLink to="/">&laquo;{subtitle}&raquo;</BaseNavLink>
              </Typography>
            </Typography>

            <PersonalScore personalScore={personalScore} />
          </Box>

          <Typography sx={{ color: colors.grey.main, fontSize: '12px' }}>
            {parseDate(created)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
