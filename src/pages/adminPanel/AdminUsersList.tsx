import React, {memo, useEffect, useState} from 'react';
import {Box, Button} from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";
import BeenhereOutlinedIcon from "@mui/icons-material/BeenhereOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import {CreateUserPanel, UsersTable} from "common";
import {User} from "store/types/User";
import {GridColDef, GridSelectionModel} from "@mui/x-data-grid";
import {
  adminTableSearchParams,
  parseDate,
  routes,
  userRoles,
  usersTablePaginationData,
  userStatus
} from "shared";
import {AdminPanelSettingsOutlined, LockOpenOutlined} from "@mui/icons-material";
import {useAppDispatch, useAppSelector} from "hooks";
import {deleteUsers, fetchUsers, updateUsersStatus} from "store/actions";
import {
  selectAdminTableSearchParams,
  selectTotalCount,
  selectUsers
} from "store/selectors";
import {useNavigate, useSearchParams} from "react-router-dom";
import {
  setCurrentUser,
  setTableSearchParams
} from "store/reducers/adminReducer/adminReducer";
import {FormattedMessage} from "react-intl";

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
    field: 'created',
    headerName: 'Created',
    flex: 1,
    renderCell: ({row: {created}}) => parseDate(created)
  },
  {
    field: 'lastLogin',
    headerName: 'Last login',
    flex: 1,
    renderCell: ({row: {lastLogin}}) => parseDate(lastLogin)
  },
  {
    field: 'role',
    headerName: 'User Role',
    flex: 1,
    renderCell: ({row: {role}}) => {
      return (
        <Box sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          width: '100%',
          gap: '10px',
          color: '#31a2ac',
        }}>
          <span>{role}</span>

          {role === userRoles.admin && <AdminPanelSettingsOutlined />}
          {role === userRoles.user && <LockOpenOutlined />}
        </Box>
      )
    }
  },
]

export const AdminUsersList = memo( () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const users = useAppSelector(selectUsers);
  const totalUsersCount = useAppSelector(selectTotalCount);
  const tableSearchParams = useAppSelector(selectAdminTableSearchParams);

  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);
  // const [pageSize, setPageSize] = useState(usersTablePaginationData.defaultRowPerPage);
  // const [page, setPage] = useState(0)

  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get(adminTableSearchParams.page) || tableSearchParams.page;
  const limit = searchParams.get(adminTableSearchParams.limit) || tableSearchParams.limit;


  const disabled = !selectionModel.length;

  const rowsPerPageOptions = usersTablePaginationData.rowsPerPage

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

  const handleRowClick = (user: User) => {
    dispatch(setCurrentUser(user))

    navigate(`${routes.admin.user}/${user._id}`)
  }

  const handleChangePage = (page: number) => {
    dispatch(setTableSearchParams({page}));

    searchParams.set(`${adminTableSearchParams.page}`, `${page}`);
    setSearchParams(searchParams);
  }

  const handleChangeLimit = (limit: number) => {
    dispatch(setTableSearchParams({limit}));

    searchParams.set(`${adminTableSearchParams.limit}`, `${limit}`);
    setSearchParams(searchParams);
  }


  useEffect(() => {
    dispatch(fetchUsers());
  }, [tableSearchParams])


  return (
    <Box>

      <CreateUserPanel />

      <Box>
        <Button
          variant={'outlined'}
          endIcon={<BlockIcon color={'warning'}/>}
          onClick={handleBlockUsers}
          disabled={disabled}
        >
          <FormattedMessage id='app.admin.button-block.title' />
        </Button>

        <Button
          variant={'outlined'}
          endIcon={<BeenhereOutlinedIcon color={'info'}/>}
          onClick={handleUnblockUsers}
          disabled={disabled}
        >
          <FormattedMessage id='app.admin.button-unblock.title' />
        </Button>

        <Button
          variant={'outlined'}
          endIcon={<DeleteOutlinedIcon color={'error'}/>}
          onClick={handleDeleteUsers}
          disabled={disabled}
        >
          <FormattedMessage id='app.admin.button-delete.title' />
        </Button>
      </Box>

      <UsersTable
        columns={columns}
        rows={users}
        rowsPerPageOptions={rowsPerPageOptions}
        selectionModel={selectionModel}
        setSelectionModel={setSelectionModel}
        handleRowClickCallback={handleRowClick}
        totalUsersCount={totalUsersCount}
        pageSize={Number(limit)}
        setPageSize={handleChangeLimit}
        pageNumber={Number(page)}
        onPageChange={handleChangePage}
      />

    </Box>
  );
});
