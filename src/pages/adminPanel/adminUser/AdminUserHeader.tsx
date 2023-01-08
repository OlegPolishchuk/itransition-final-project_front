import React, { FC, useState } from 'react';

import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import { Box, Button, Tooltip } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import { CustomDialog, DeleteUsersDialogText } from 'common';
import { useAppDispatch } from 'hooks';
import { UserStatus } from 'shared';
import { updateCurrentUser, deleteCurrentUser } from 'store/actions';

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
          <Tooltip
            title={<FormattedMessage id="app.user.info.tooltip-status-blocked" />}
            placement="top"
          >
            <BlockOutlinedIcon color="warning" />
          </Tooltip>
        ) : (
          <Tooltip
            title={<FormattedMessage id="app.user.info.tooltip-status-active" />}
            placement="top"
          >
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
            <FormattedMessage id="app.user.info.button-block.title" />
          </Button>
        ) : (
          <Button
            variant="outlined"
            endIcon={<VerifiedUserOutlinedIcon color="info" />}
            onClick={() => handleUpdateUserStatus(UserStatus.Active)}
            disabled={user.status === UserStatus.Active}
          >
            <FormattedMessage id="app.user.info.button-unblock.title" />
          </Button>
        )}

        <Button
          variant="outlined"
          endIcon={<DeleteOutlineOutlinedIcon color="error" />}
          onClick={handleOpenModal}
        >
          <FormattedMessage id="app.user.info.button-delete.title" />
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
