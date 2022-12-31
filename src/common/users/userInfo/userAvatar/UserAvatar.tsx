import React, { ChangeEvent, FC } from 'react';

import { PhotoCamera } from '@mui/icons-material';
import { Avatar, Box, Button, useMediaQuery } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { Loader } from 'common/loaders';
import { useAppDispatch, useAppSelector } from 'hooks';
import { changeUserAvatar } from 'store/actions';
import { selectIsUserLoading } from 'store/selectors';

type Props = {
  avatarSrc: string;
  isMyProfile: boolean;
  userId: string;
};

export const UserAvatar: FC<Props> = ({ avatarSrc, userId, isMyProfile }) => {
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(selectIsUserLoading);

  const smallScreen = useMediaQuery('(max-width: 600px)');

  const avatarMargin = smallScreen ? '0 auto' : '';

  const handleChangeAvatar = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      const file = e.target.files[0];

      const formData = new FormData();

      formData.append('file', file as File, `${userId}_${file.name}`);

      dispatch(changeUserAvatar(formData));
    }
  };

  return (
    <Box sx={{ maxWidth: '200px' }} textAlign="center" margin={avatarMargin}>
      <Avatar src={avatarSrc} sx={{ width: 180, height: 180, margin: '0 auto' }} />

      {isLoading && (
        <Box sx={{ width: 180, height: 180, margin: '0 auto' }}>
          <Loader />
        </Box>
      )}

      <Box mt="20px">
        {isMyProfile && (
          <Button
            variant="outlined"
            aria-label="upload picture"
            component="label"
            size="small"
            endIcon={<PhotoCamera />}
          >
            <FormattedMessage id="app.user.info.avatar.button-change.title" />
            <input hidden accept="image/*" type="file" onChange={handleChangeAvatar} />
          </Button>
        )}
      </Box>
    </Box>
  );
};
