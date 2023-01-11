import React, { FC, useState } from 'react';

import BeenhereOutlinedIcon from '@mui/icons-material/BeenhereOutlined';
import BlockIcon from '@mui/icons-material/Block';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Box, Button } from '@mui/material';
import { GridSelectionModel } from '@mui/x-data-grid';

import { CustomDialog, DeleteUsersDialogText } from 'common';
import { useAppDispatch } from 'hooks';
import { formatMessage, UserStatus } from 'shared';
import { deleteUsers, updateUsersStatus } from 'store/actions';

const localeMessage = formatMessage('admin');

type Props = {
  selectionModel: GridSelectionModel;
  cardListSelection: string[];
  setSelectionModel: (newSelectionModel: GridSelectionModel) => void;
  setCardListSelection: (cardListSelection: string[]) => void;
  setMainCheckboxChecked: (mainCheckboxChecked: boolean) => void;
};

export const AdminControlPanel: FC<Props> = ({
  setSelectionModel,
  selectionModel,
  cardListSelection,
  setCardListSelection,
  setMainCheckboxChecked,
}) => {
  const dispatch = useAppDispatch();

  const [modalOpen, setModalOpen] = useState(false);

  const disabled = !selectionModel.length && !cardListSelection.length;

  const handleBlockUsers = (): void => {
    const newData = selectionModel.length ? [...selectionModel] : [...cardListSelection];

    const users = newData.map(id => ({ id: `${id}`, status: UserStatus.Blocked }));

    dispatch(updateUsersStatus(users));
    setSelectionModel([]);
    setCardListSelection([]);
  };

  const handleUnblockUsers = (): void => {
    const newData = selectionModel.length ? [...selectionModel] : [...cardListSelection];

    const users = newData.map(id => ({ id: `${id}`, status: UserStatus.Active }));

    dispatch(updateUsersStatus(users));
    setSelectionModel([]);
    setCardListSelection([]);
  };

  const handleDeleteUsers = (): void => {
    const usersIdToDelete = selectionModel.length ? selectionModel : cardListSelection;

    dispatch(deleteUsers(usersIdToDelete as string[]));
    setMainCheckboxChecked(false);

    handleCloseModal();
  };

  const handleOpenModal = (): void => {
    setModalOpen(true);
  };

  const handleCloseModal = (): void => {
    setModalOpen(false);
  };

  return (
    <Box className="admin-controls" justifyContent="flex-end" mb="30px">
      <Box className="admin-controls-buttonGroup">
        <Button
          variant="outlined"
          endIcon={<BlockIcon color="warning" />}
          onClick={handleBlockUsers}
          disabled={disabled}
        >
          {localeMessage('button-block')}
        </Button>

        <Button
          variant="outlined"
          endIcon={<BeenhereOutlinedIcon color="info" />}
          onClick={handleUnblockUsers}
          disabled={disabled}
        >
          {localeMessage('button-unblock')}
        </Button>

        <Button
          variant="outlined"
          endIcon={<DeleteOutlinedIcon color="error" />}
          onClick={handleOpenModal}
          disabled={disabled}
        >
          {localeMessage('button-delete')}
        </Button>
      </Box>

      <CustomDialog
        open={modalOpen}
        acceptCallback={handleDeleteUsers}
        canselCallback={handleCloseModal}
      >
        <DeleteUsersDialogText
          usersIdToDelete={
            (selectionModel.length ? selectionModel : cardListSelection) as string[]
          }
        />
      </CustomDialog>
    </Box>
  );
};
