import React, {FC} from 'react';
import {Avatar, Box, IconButton, useMediaQuery} from "@mui/material";
import {PhotoCamera} from "@mui/icons-material";

type Props = {
  avatarSrc: string;
  editAvatarCallback?: () => void;
  isMyProfile: boolean;
}

export const UserAvatar: FC<Props> = ({avatarSrc, editAvatarCallback, isMyProfile}) => {
  const smallScreen = useMediaQuery('(max-width: 600px)');

  const avatarMargin = smallScreen ? '0 auto' : '';

  return (
    <Box sx={{maxWidth: '200px'}} textAlign={'center'} margin={avatarMargin}>

      <Avatar
        src={avatarSrc}
        sx={{ width: 180, height: 180, margin: '0 auto'}}
      />

      <Box mt={'20px'}>
        {/*<Button*/}
        {/*  variant={'outlined'}*/}
        {/*  size={'small'}*/}
        {/*  onClick={editAvatarCallback}*/}
        {/*>*/}
        {/*  Edit*/}
        {/*</Button>*/}

        {isMyProfile && (
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
            size={'large'}
          >
            <input hidden accept="image/*" type="file" />
            <PhotoCamera />
          </IconButton>
        )}

      </Box>

    </Box>
  );
};

