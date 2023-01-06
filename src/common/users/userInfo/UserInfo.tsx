import React, { memo, ReactElement, useEffect, useRef, useState } from 'react';

import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import { Box, Button, ButtonGroup, Grid } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { UserAvatar, UserDescription } from 'common';
import { useAppDispatch, useAppSelector } from 'hooks';
import { AdminUserHeader } from 'pages';
import { UserRole } from 'shared';
import { updateCurrentUser } from 'store/actions';
import { selectUserRole } from 'store/selectors';
import { User } from 'store/types';

type Props = {
  user: User;
  isMyProfile: boolean;
};

export const UserInfo = memo(({ user, isMyProfile }: Props): ReactElement => {
  const dispatch = useAppDispatch();

  const userRole = useAppSelector(selectUserRole);

  const [editMode, setEditMode] = useState(false);
  const [userCopy, setUserCopy] = useState<{ [key: string]: any }>(() => ({ ...user }));

  const userNameRef = useRef<HTMLInputElement>(null);

  const handleSaveUserDescription = (): void => {
    const usernameInput = userNameRef.current as HTMLInputElement;
    const username = usernameInput.value.length ? usernameInput.value : userCopy.userName;

    setEditMode(false);

    const userData = {
      ...userCopy,
      userName: username,
    };

    dispatch(updateCurrentUser(userData));
  };

  const handleCancelEditing = (): void => {
    setUserCopy({ ...user });
    setEditMode(false);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Enter') {
        handleSaveUserDescription();
      }
      if (event.key === 'Escape') {
        handleCancelEditing();
      }
    };

    if (editMode) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [editMode]);

  return (
    <Grid container rowSpacing={8} sx={style.flex}>
      {userRole === UserRole.Admin && (
        <Grid item xs={12} sm={12}>
          <AdminUserHeader user={userCopy} />
        </Grid>
      )}

      <Grid item xs={12} sm={4} md={3}>
        <UserAvatar avatarSrc={user.avatar} userId={user._id} isMyProfile={isMyProfile} />
      </Grid>

      <Grid item xs={12} sm={8} md={9} sx={style.userDescriptionWrapper}>
        <UserDescription
          user={user}
          editMode={editMode}
          userCopy={userCopy}
          setUserCopy={setUserCopy}
          ref={userNameRef}
        />

        <Box alignSelf="flex-end">
          {isMyProfile && (
            <div>
              {editMode ? (
                <Box sx={style.flex}>
                  <ButtonGroup>
                    <Button
                      sx={style.saveCanselBtn}
                      variant="outlined"
                      color="secondary"
                      endIcon={<SaveAsOutlinedIcon />}
                      onClick={handleSaveUserDescription}
                    >
                      <FormattedMessage id="app.user.info.button-save.title" />
                    </Button>

                    <Button
                      sx={style.saveCanselBtn}
                      variant="outlined"
                      color="success"
                      endIcon={<CancelOutlinedIcon />}
                      onClick={handleCancelEditing}
                    >
                      <FormattedMessage id="app.user.info.button-cancel.title" />
                    </Button>
                  </ButtonGroup>
                </Box>
              ) : (
                <Button
                  sx={style.editBtn}
                  variant="outlined"
                  endIcon={<EditOutlinedIcon />}
                  onClick={() => setEditMode(true)}
                >
                  <FormattedMessage id="app.user.info.button-edit.title" />
                </Button>
              )}
            </div>
          )}
        </Box>
      </Grid>
    </Grid>
  );
});

const style = {
  flex: { display: 'flex' },

  userDescriptionWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
  },

  editBtn: { width: '200px' },
  saveCanselBtn: { minWidth: '100px' },
};
