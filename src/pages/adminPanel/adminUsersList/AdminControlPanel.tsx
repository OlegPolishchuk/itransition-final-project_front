import React, {FC} from 'react';
import {Box, Button} from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";
import {FormattedMessage} from "react-intl";
import BeenhereOutlinedIcon from "@mui/icons-material/BeenhereOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import {userStatus} from "shared";
import {deleteUsers, updateUsersStatus} from "store/actions";
import {GridSelectionModel} from "@mui/x-data-grid";
import {useAppDispatch} from "hooks";

type Props = {
  selectionModel: GridSelectionModel;
  cardListSelection: string[];
  setSelectionModel: (newSelectionModel: GridSelectionModel) => void;
  setCardListSelection: (cardListSelection: string[]) => void;
  setMainCheckboxChecked: (mainCheckboxChecked: boolean) => void;
}

export const AdminControlPanel: FC<Props> = ({
                                               setSelectionModel,
                                               selectionModel,
                                               cardListSelection,
                                               setCardListSelection,
                                               setMainCheckboxChecked,
                                             }) => {
  const dispatch = useAppDispatch();

  const disabled = !selectionModel.length && !cardListSelection.length;

  const handleBlockUsers = () => {
    const newData = selectionModel.length
      ? [...selectionModel]
      : [...cardListSelection];

    const users = newData.map(id =>
      ({id: `${id}`, status: userStatus.blocked}))

    dispatch(updateUsersStatus(users))
    setSelectionModel([]);
    setCardListSelection([]);
  }

  const handleUnblockUsers = () => {
    const newData = selectionModel.length
      ? [...selectionModel]
      : [...cardListSelection];

    const users = newData.map(id =>
      ({id: `${id}`, status: userStatus.active}))

    dispatch(updateUsersStatus(users))
    setSelectionModel([]);
    setCardListSelection([]);
  }

  const handleDeleteUsers = () => {
    const usersIdToDelete = selectionModel.length
      ? selectionModel
      : cardListSelection;

    dispatch(deleteUsers(usersIdToDelete as string[]));
    setMainCheckboxChecked(false);
  }

  return (
    <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
      <Button
        variant={'outlined'}
        endIcon={<BlockIcon color={'warning'}/>}
        onClick={handleBlockUsers}
        disabled={disabled}
      >
        <FormattedMessage id='app.admin.button-block.title'/>
      </Button>

      <Button
        variant={'outlined'}
        endIcon={<BeenhereOutlinedIcon color={'info'}/>}
        onClick={handleUnblockUsers}
        disabled={disabled}
      >
        <FormattedMessage id='app.admin.button-unblock.title'/>
      </Button>

      <Button
        variant={'outlined'}
        endIcon={<DeleteOutlinedIcon color={'error'}/>}
        onClick={handleDeleteUsers}
        disabled={disabled}
      >
        <FormattedMessage id='app.admin.button-delete.title'/>
      </Button>
    </Box>
  );
};
