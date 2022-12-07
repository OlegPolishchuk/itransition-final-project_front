import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "hooks";
import {GridColDef, GridSelectionModel} from '@mui/x-data-grid';
import {fetchUsers} from "store/actions/users/fetchUsers";
import {selectUsers} from "store/selectors";
import {Box, Button, Container} from "@mui/material";
import {User} from "store/types/User";
import {userRoles, userStatus} from "shared";
import {AdminPanelSettingsOutlined, LockOpenOutlined} from "@mui/icons-material";
import {UsersTable} from "common";

import BlockIcon from '@mui/icons-material/Block';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import BeenhereOutlinedIcon from '@mui/icons-material/BeenhereOutlined';
import {deleteUsers, updateUsersStatus} from "store/actions";

const columns: GridColDef[] = [
  {field: '_id', headerName: 'ID', flex: 2},
  {field: 'login', headerName: 'User', flex: 2},
  {field: 'status', headerName: 'User Status', flex: 1},
  {
    field: 'reviews',
    headerName: 'Reviews',
    flex: 1,
    renderCell: ({row: {reviews}}) => {
      return (
        reviews.lenght || 0
      )
    }
  },
  {
    field: 'role',
    headerName: 'User Role',
    flex: 1,
    renderCell: ({row: {role}}) => {
      return (
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          color: '#31a2ac',
        }}>
          {role}

          {role === userRoles.admin && <AdminPanelSettingsOutlined />}
          {role === userRoles.user && <LockOpenOutlined />}
        </Box>
      )
    }
  },
]

export const AdminPanel = () => {
  const dispatch = useAppDispatch();

  const users = useAppSelector(selectUsers);

  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);
  const disabled = !selectionModel.length;


  const handleBlockUsers = () => {
    const users = selectionModel.map(id =>
      ({id: `${id}`, status: userStatus.blocked}))
    dispatch(updateUsersStatus(users))
    setSelectionModel([]);
  }

  const handleUnblockUsers = () => {
    const users = selectionModel.map(id =>
      ({id: `${id}`, status: userStatus.active}))
    dispatch(updateUsersStatus(users))
    setSelectionModel([]);
  }

  const handleDeleteUsers = () => {
    dispatch(deleteUsers(selectionModel as string[]))
  }

  useEffect(() => {
    dispatch(fetchUsers());
  }, [])

  return (
    <Container sx={{
      padding: '30px 0'
    }}>

      <Box>
        <Button
          variant={'outlined'}
          endIcon={<BlockIcon color={'warning'}/>}
          onClick={handleBlockUsers}
          disabled={disabled}
        >
            Block
        </Button>

        <Button
          variant={'outlined'}
          endIcon={<BeenhereOutlinedIcon color={'info'}/>}
          onClick={handleUnblockUsers}
          disabled={disabled}
        >
          Unblock
        </Button>

        <Button
          variant={'outlined'}
          endIcon={<DeleteOutlinedIcon color={'error'}/>}
          onClick={handleDeleteUsers}
          disabled={disabled}
        >
          Delete
        </Button>
      </Box>

      <UsersTable
        columns={columns}
        rows={users}
        selectionModel={selectionModel}
        setSelectionModel={setSelectionModel}
      />

    </Container>
  );
};
