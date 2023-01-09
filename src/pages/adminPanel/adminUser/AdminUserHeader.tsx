import React, { FC, useState } from 'react';

import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import { Box, Button, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { CustomDialog, DeleteUsersDialogText } from 'common';
import { useAppDispatch } from 'hooks';
import { formatMessage, UserStatus } from 'shared';
import { deleteCurrentUser, updateCurrentUser } from 'store/actions';

const localeMessage = formatMessage('user.info');

type Props = {
  user: { [key: string]: any };
};

export const AdminUserHeader: FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = (): void => {
    setOpenModal(true);
  };

  const handleCloseModal = (): void => {
    setOpenModal(false);
  };

  const handleUpdateUserStatus = (status: UserStatus): void => {
    const updatedUser = {
      ...user,
      status,
    };

    dispatch(updateCurrentUser(updatedUser));
  };

  const handleDeleteUser = (): void => {
    dispatch(deleteCurrentUser(user._id));

    navigate(-1);
  };

  return (
    <Box className="admin-controls">
      <Box className="admin-user-header-status">
        {user.status === UserStatus.Blocked ? (
          <Tooltip title={localeMessage('tooltip-status-blocked')} placement="top">
            <BlockOutlinedIcon color="warning" />
          </Tooltip>
        ) : (
          <Tooltip title={localeMessage('tooltip-status-active')} placement="top">
            <VerifiedUserOutlinedIcon color="secondary" />
          </Tooltip>
        )}
      </Box>

      <Box className="admin-controls-buttonGroup">
        {user.status === UserStatus.Active ? (
          <Button
            variant="outlined"
            endIcon={<BlockOutlinedIcon color="warning" />}
            onClick={() => handleUpdateUserStatus(UserStatus.Blocked)}
            disabled={user.status === UserStatus.Blocked}
          >
            {localeMessage('button-block')}
          </Button>
        ) : (
          <Button
            variant="outlined"
            endIcon={<VerifiedUserOutlinedIcon color="info" />}
            onClick={() => handleUpdateUserStatus(UserStatus.Active)}
            disabled={user.status === UserStatus.Active}
          >
            {localeMessage('button-unblock')}
          </Button>
        )}

        <Button
          variant="outlined"
          endIcon={<DeleteOutlineOutlinedIcon color="error" />}
          onClick={handleOpenModal}
        >
          {localeMessage('button-delete')}
        </Button>
      </Box>

      <CustomDialog
        open={openModal}
        acceptCallback={handleDeleteUser}
        canselCallback={handleCloseModal}
      >
        <DeleteUsersDialogText usersIdToDelete={[`${user._id}`]} />
      </CustomDialog>
    </Box>
  );
};
