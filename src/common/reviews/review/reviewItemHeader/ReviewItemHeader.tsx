import React, {FC} from 'react';
import {Avatar, Box, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";
import {parseDate} from "shared";
import {Review} from "store/types";
import {useAppSelector, useThemeColors} from "hooks";
import {selectThemeMode} from "store/selectors";
import {BaseNavLink} from "common/baseNavLink/BaseNavLink";

type Props = {
  userName: string;
  userAvatar: string;
  created: string;
}

export const ReviewItemHeader: FC<Props> = ({userName, userAvatar, created}) => {
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
          <BaseNavLink to={'/'} >
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
