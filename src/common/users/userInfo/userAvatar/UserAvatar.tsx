import React, {FC} from 'react';
import {Avatar, Box, Button} from "@mui/material";

type Props = {
  avatarSrc: string;
  editAvatarCallback: () => void;
}

export const UserAvatar: FC<Props> = ({avatarSrc, editAvatarCallback}) => {
  return (
    <Box sx={{maxWidth: '200px'}} textAlign={'center'} margin={'0 auto'}>

      <Avatar
        src={avatarSrc}
        sx={{ width: 180, height: 180, margin: '0 auto'}}
      />

      <Box mt={'20px'}>
        <Button
          variant={'outlined'}
          size={'small'}
          onClick={editAvatarCallback}
        >
          Edit
        </Button>
      </Box>

    </Box>
  );
};

