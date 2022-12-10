import React, {memo, useCallback, useEffect, useState} from 'react';
import {Avatar, Box, Button, Card, CardHeader, Grid, Typography} from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";
import BeenhereOutlinedIcon from "@mui/icons-material/BeenhereOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import {CreateUserPanel, UsersTable} from "common";
import {User} from "store/types/User";
import {GridColDef, GridSelectionModel} from "@mui/x-data-grid";
import {
  adminTableSearchParams, getWindowWidth,
  parseDate,
  routes,
  userRoles,
  usersTablePaginationData,
  userStatus
} from "shared";
import {AdminPanelSettingsOutlined, LockOpenOutlined} from "@mui/icons-material";
import {useAppDispatch, useAppSelector} from "hooks";
import {deleteUsers, fetchUsers, initializeApp, updateUsersStatus} from "store/actions";
import {
  selectAdminTableSearchParams, selectIsInitialize,
  selectTotalCount,
  selectUsers
} from "store/selectors";
import {useNavigate, useSearchParams} from "react-router-dom";
import {
  setCurrentUser,
  setTableSearchParams
} from "store/reducers/adminReducer/adminReducer";
import {FormattedMessage} from "react-intl";
import {RootState} from "store/store";
import {adminTableColumns} from 'shared'
import {AdminControlPanel} from "pages/adminPanel/adminUsersList/AdminControlPanel";
import {AdminUserCardsList} from "pages/adminPanel/adminUsersList/AdminUserCardsList";

export const AdminUsersList = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const isInitiaize = useAppSelector(selectIsInitialize);
  const users = useAppSelector(selectUsers);
  const totalUsersCount = useAppSelector(selectTotalCount);
  const tableSearchParams = useAppSelector(selectAdminTableSearchParams);
  const tablePage = useAppSelector((state: RootState) => state.adminReducer.tableSearchParams.page)
  const tableLimit = useAppSelector((state: RootState) => state.adminReducer.tableSearchParams.limit)

  const [windowWidth, setWindowWidth] = useState(getWindowWidth());

  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);
  const [cardListSelection, setCardListSelection] = useState<string[]>([]);
  const [cardsListMainCheckbox, setCardsListMainCheckbox] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get(adminTableSearchParams.page) || tableSearchParams.page;
  const limit = searchParams.get(adminTableSearchParams.limit) || tableSearchParams.limit;

  const rowsPerPageOptions = usersTablePaginationData.rowsPerPage

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
    dispatch(setTableSearchParams({
      page: Number(page),
      limit: Number(limit),
    }))

    searchParams.set(`${adminTableSearchParams.page}`, `${page}`);
    searchParams.set(`${adminTableSearchParams.limit}`, `${limit}`);
    setSearchParams(searchParams);
  }, [])


  useEffect(() => {
    if (isInitiaize) {
      dispatch(fetchUsers());
    }
  }, [tablePage, tableLimit, isInitiaize])

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
    <Box className={'admin-users-list'}>

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
              pageSize={Number(limit)}
              setPageSize={handleChangeLimit}
              pageNumber={Number(page)}
              onPageChange={handleChangePage}
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
            page={Number(page)}
            limitPerPage={Number(limit)}
            onChangeCallback={handleChangePage}
          />
        )
      }

    </Box>
  );
};
