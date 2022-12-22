import React, {FC} from 'react';
import {Avatar, Box, Typography} from "@mui/material";
import {parseDate, routes} from "shared";
import {useThemeColors} from "hooks";
import {BaseNavLink} from "common/baseNavLink/BaseNavLink";

type Props = {
  userName: string;
  userAvatar: string;
  created: string;
  userId: string;
}

export const ReviewItemHeader: FC<Props> = ({userName, userAvatar, created, userId}) => {
  const colors = useThemeColors();

  return (
    <Box sx={{
      padding: '10px'
    }}>

      <Box sx={{
        display: 'flex',
        gap: '15px',
      }}>
        <Avatar
          sx={{width: '30px', height: '30px'}}
          alt={userName}
          src={userAvatar}
        />

        <Typography>
          <BaseNavLink to={`${routes.profile.base}/${userId}`} >
            {userName}
          </BaseNavLink>
        </Typography>

        <Typography sx={{color: colors.grey.main,}}>
          {parseDate(created)}
        </Typography>
      </Box>

    </Box>
  );
};
