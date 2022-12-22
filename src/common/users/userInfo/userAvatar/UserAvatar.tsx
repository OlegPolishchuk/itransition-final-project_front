import React, {ChangeEvent, FC} from 'react';
import {Avatar, Box, IconButton, useMediaQuery} from "@mui/material";
import {PhotoCamera} from "@mui/icons-material";
import {useAppDispatch} from "hooks";
import {changeUserAvatar} from "store/actions";


type Props = {
  avatarSrc: string;
  isMyProfile: boolean;
  userId: string;
}

export const UserAvatar: FC<Props> = ({avatarSrc, userId, isMyProfile}) => {
  const dispatch = useAppDispatch();

  const smallScreen = useMediaQuery('(max-width: 600px)');

  const avatarMargin = smallScreen ? '0 auto' : '';


  const handleChangeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];

      const formData = new FormData();

      formData.append('file', file as File, `${userId}_${file.name}`);

      dispatch(changeUserAvatar(formData));
    }
  }

  return (
    <Box sx={{maxWidth: '200px'}} textAlign={'center'} margin={avatarMargin}>

      <Avatar
        src={avatarSrc}
        sx={{width: 180, height: 180, margin: '0 auto'}}
      />

      <Box mt={'20px'}>

        {isMyProfile && (
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
            size={'large'}
          >
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={handleChangeAvatar}
            />
            <PhotoCamera/>
          </IconButton>
        )}

      </Box>

    </Box>
  );
};

