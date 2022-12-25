import React, {FC} from 'react';
import {Avatar, Box, IconButton, Typography} from "@mui/material";
import {parseDate, routes} from "shared";
import {useAppDispatch, useAppSelector, useThemeColors} from "hooks";
import {BaseNavLink} from "common/baseNavLink/BaseNavLink";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import {selectIsUserAuth, selectUser} from "store/selectors";
import {setReviewLike} from "store/actions";

type Props = {
  userName: string;
  userAvatar: string;
  created: string;
  userId: string;
  userLikes: number;
}

export const ReviewItemHeader: FC<Props> = ({
                                              userName,
                                              userAvatar,
                                              created,
                                              userId,
                                             userLikes,
                                            }) => {

  const user = useAppSelector(selectUser);

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
    <Box sx={{
      padding: '10px'
    }}>

      <Box sx={{
        display: 'flex',
        gap: '15px',
      }}>

        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>

          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>

            <Avatar
              sx={{width: '50px', height: '50px'}}
              alt={userName}
              src={userAvatar}
            />

            <Box sx={footerItemStyle}>
              <FavoriteBorderOutlinedIcon
                color={'disabled'}
                sx={{width: '15px', height: '15px'}}
              />

              <Typography component={'span'} color={colors.warning.main}>
                {userLikes ? userLikes : 0}
              </Typography>
            </Box>

          </Box>

        </Box>

        <Typography>
          <BaseNavLink to={`${routes.profile.base}/${userId}`}>
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
