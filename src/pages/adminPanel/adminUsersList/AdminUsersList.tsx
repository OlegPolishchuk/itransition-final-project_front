import React, { ReactElement, useEffect, useState } from 'react';

import { Box, useMediaQuery } from '@mui/material';
import { GridSelectionModel } from '@mui/x-data-grid';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';

import { CreateUserPanel, UsersTable } from 'common';
import { useAppDispatch, useAppSelector } from 'hooks';
import { AdminControlPanel, AdminUserCardsList } from 'pages';
import {
  adminTableColumns,
  adminTableSearchParams,
  paginationDefaultParams,
  routes,
  usersTablePaginationData,
} from 'shared';
import { fetchUsers } from 'store/actions';
import { setCurrentUser, setTableSearchParams } from 'store/reducers';
import {
  selectAdminTableSearchParamsLimit,
  selectAdminTableSearchParamsPage,
  selectIsUsersLoading,
  selectTotalCount,
  selectUsersWithoutAdmin,
} from 'store/selectors';
import { User } from 'store/types/User/User';

export const AdminUsersList = (): ReactElement => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const users = useAppSelector(selectUsersWithoutAdmin);
  const isUsersLoading = useAppSelector(selectIsUsersLoading);
  const totalUsersCount = useAppSelector(selectTotalCount);
  const page = useAppSelector(selectAdminTableSearchParamsPage);
  const limit = useAppSelector(selectAdminTableSearchParamsLimit);

  const isSmallScreen = useMediaQuery('(max-width: 900px)');

  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);
  const [cardListSelection, setCardListSelection] = useState<string[]>([]);
  const [cardsListMainCheckbox, setCardsListMainCheckbox] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const pageParams = Number(searchParams.get(adminTableSearchParams.page)) || page;
  const limitParams = Number(searchParams.get(adminTableSearchParams.limit)) || limit;

  const rowsPerPageOptions = usersTablePaginationData.rowsPerPage;

  const handleRowClick = (user: User): void => {
    const userPagePaginationPrams = {
      page: `${paginationDefaultParams.page}`,
      limit: `${paginationDefaultParams.limit}`,
    };

    dispatch(setCurrentUser(user));

    navigate({
      pathname: `${routes.admin.user}/${user._id}`,
      search: `${createSearchParams(userPagePaginationPrams)}`,
    });
  };

  const handleChangePage = (page: number): void => {
    dispatch(setTableSearchParams({ page }));

    searchParams.set(`${adminTableSearchParams.page}`, `${page}`);
    setSearchParams(searchParams);
  };

  const handleChangeLimit = (limit: number): void => {
    dispatch(setTableSearchParams({ limit }));

    searchParams.set(`${adminTableSearchParams.limit}`, `${limit}`);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    dispatch(
      setTableSearchParams({
        page: pageParams,
        limit: limitParams,
      }),
    );

    searchParams.set(`${adminTableSearchParams.page}`, `${pageParams}`);
    searchParams.set(`${adminTableSearchParams.limit}`, `${limitParams}`);
    setSearchParams(searchParams);
  }, []);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [page, limit]);

  useEffect(() => {
    if (!isSmallScreen) {
      setCardListSelection([]);
    } else {
      setSelectionModel([]);
    }
  }, [isSmallScreen]);

  return (
    <Box className="admin-admin-list">
      <CreateUserPanel />

      <AdminControlPanel
        selectionModel={selectionModel}
        setSelectionModel={setSelectionModel}
        cardListSelection={cardListSelection}
        setCardListSelection={setCardListSelection}
        setMainCheckboxChecked={setCardsListMainCheckbox}
      />

      {!isSmallScreen ? (
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
      ) : (
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
      )}
    </Box>
  );
};
