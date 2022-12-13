import React, {memo, useCallback, useEffect, useState} from 'react';
import {Avatar, Box, Button, Card, CardHeader, Grid, Typography} from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";
import BeenhereOutlinedIcon from "@mui/icons-material/BeenhereOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import {CreateUserPanel, UsersTable} from "common";
import {User} from "store/types/User";
import {GridColDef, GridSelectionModel} from "@mui/x-data-grid";
import {
  adminTableSearchParams,
  getWindowWidth, paginationDefaultParams,
  parseDate,
  routes,
  userRoles,
  usersTablePaginationData,
  userStatus
} from "shared";
import {AdminPanelSettingsOutlined, LockOpenOutlined} from "@mui/icons-material";
import {useAppDispatch, useAppSelector} from "hooks";
import {
  deleteUsers,
  fetchUsers,
  getTags,
  initializeApp,
  updateUsersStatus
} from "store/actions";
import {
  selectAdminTableSearchParams, selectIsInitialize, selectIsUsersLoading,
  selectTotalCount,
  selectUsers
} from "store/selectors";
import {createSearchParams, useNavigate, useSearchParams} from "react-router-dom";
import {
  setCurrentUser,
  setTableSearchParams
} from "store/reducers/adminReducer/adminReducer";
import {FormattedMessage} from "react-intl";
import {RootState} from "store/store";
import {adminTableColumns} from 'shared';
import { AdminControlPanel, AdminUserCardsList } from 'pages';


export const AdminUsersList = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const isInitiaize = useAppSelector(selectIsInitialize);
  const users = useAppSelector(selectUsers);
  const isUsersLoading = useAppSelector(selectIsUsersLoading);
  const totalUsersCount = useAppSelector(selectTotalCount);
  const tableSearchParams = useAppSelector(selectAdminTableSearchParams);

  const [windowWidth, setWindowWidth] = useState(getWindowWidth());

  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);
  const [cardListSelection, setCardListSelection] = useState<string[]>([]);
  const [cardsListMainCheckbox, setCardsListMainCheckbox] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get(adminTableSearchParams.page)) || tableSearchParams.page;
  const limit = Number(searchParams.get(adminTableSearchParams.limit)) || tableSearchParams.limit;

  const rowsPerPageOptions = usersTablePaginationData.rowsPerPage

  const handleRowClick = (user: User) => {
    const userPagePaginationPrams = {
      'page': `${paginationDefaultParams.page}`,
      'limit': `${paginationDefaultParams.limit}`
    }

    dispatch(setCurrentUser(user))

    navigate({
      pathname: `${routes.admin.user}/${user._id}`,
      search: `${createSearchParams(userPagePaginationPrams)}`
    })
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
    dispatch(setTableSearchParams({
      page,
      limit,
    }))

    searchParams.set(`${adminTableSearchParams.page}`, `${page}`);
    searchParams.set(`${adminTableSearchParams.limit}`, `${limit}`);
    setSearchParams(searchParams);
  }, [])


  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(getTags());
  }, [tableSearchParams.page, tableSearchParams.limit])

  useEffect(() => {
    const resizeListener = () => {
      setWindowWidth(getWindowWidth());

      if (windowWidth >= 900) {
        setCardListSelection([])
      }
      else {
        setSelectionModel([])
      }
    };

    window.addEventListener('resize', resizeListener);

    return () => {
      window.removeEventListener('resize', resizeListener);
    }
  }, [windowWidth])

  return (
    <Box className={'admin-admin-list'}>

      <CreateUserPanel/>

      <AdminControlPanel
        selectionModel={selectionModel}
        setSelectionModel={setSelectionModel}
        cardListSelection={cardListSelection}
        setCardListSelection={setCardListSelection}
        setMainCheckboxChecked={setCardsListMainCheckbox}
      />

      {windowWidth >= 900
        ? (
          <Box>
            <UsersTable
              columns={adminTableColumns}
              rows={users}
              rowsPerPageOptions={rowsPerPageOptions}
              selectionModel={selectionModel}
              setSelectionModel={setSelectionModel}
              handleRowClickCallback={handleRowClick}
              totalUsersCount={totalUsersCount}
              pageSize={limit}
              setPageSize={handleChangeLimit}
              pageNumber={page}
              onPageChange={handleChangePage}
              loading={isUsersLoading}
            />
          </Box>
        )
        : (
          <AdminUserCardsList
            users={users}
            setCardListSelection={setCardListSelection}
            cardListSelection={cardListSelection}
            mainCheckboxChecked={cardsListMainCheckbox}
            setMainCheckboxChecked={setCardsListMainCheckbox}
            totalCount={totalUsersCount}
            page={page}
            limitPerPage={limit}
            onChangeCallback={handleChangePage}
          />
        )
      }

    </Box>
  );
};
