import React, { FC } from 'react';

import { Box, LinearProgress } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridRowParams,
  GridSelectionModel,
} from '@mui/x-data-grid';

import { useAppSelector, useThemeColors } from 'hooks';
import { AdminDataGridFooter } from 'pages';
import { userRoles } from 'shared';
import { selectThemeMode } from 'store/selectors';
import { User } from 'store/types/User/User';

type Props = {
  columns: GridColDef[];
  rows: User[];
  setSelectionModel: (newSelectionModel: GridSelectionModel) => void;
  selectionModel: GridSelectionModel;
  handleRowClickCallback: (user: User) => void;
  totalUsersCount: number;
  pageSize: number;
  setPageSize: (pageSize: number) => void;
  pageNumber: number;
  onPageChange: (pageNumber: number) => void;
  rowsPerPageOptions: number[];
  loading: boolean;
};

export const UsersTable: FC<Props> = ({
  rows,
  columns,
  setSelectionModel,
  selectionModel,
  handleRowClickCallback,
  totalUsersCount,
  setPageSize,
  pageSize,
  pageNumber,
  onPageChange,
  rowsPerPageOptions,
  loading,
}) => {
  const theme = useAppSelector(selectThemeMode);
  const themeColors = useThemeColors();

  const handleSelectRow = (newSelectionModel: GridSelectionModel): void => {
    setSelectionModel(newSelectionModel);
  };

  const handleRowClick = (params: GridRowParams): void => {
    handleRowClickCallback(params.row);
  };

  return (
    <Box
      sx={{
        height: '500px',
        '& .row-role--admin': {
          backgroundColor: theme === 'light' ? '#efefef' : 'rgba(255, 255, 255, 0.08)',
        },
        '& .row-status--blocked': {
          color: '#b2b1b1',
        },
      }}
    >
      <DataGrid
        className="admin-table-dataGrid"
        columns={columns}
        rows={rows}
        rowsPerPageOptions={rowsPerPageOptions}
        pageSize={pageSize}
        page={pageNumber}
        onPageChange={onPageChange}
        onPageSizeChange={newPageSize => setPageSize(newPageSize)}
        paginationMode="server"
        rowCount={totalUsersCount}
        getRowId={(row: User) => row._id}
        checkboxSelection
        disableSelectionOnClick
        isRowSelectable={params => params.row.role !== userRoles.admin}
        getRowClassName={param =>
          `row-role--${param.row.role} row-status--${param.row.status}`
        }
        isCellEditable={params => params.row.role !== userRoles.admin}
        selectionModel={selectionModel}
        onSelectionModelChange={handleSelectRow}
        onRowClick={handleRowClick}
        components={{
          LoadingOverlay: LinearProgress,
          // Pagination: CustomPagination,
          Footer: AdminDataGridFooter,
        }}
        componentsProps={{
          footer: {
            rowsPerPageOptions,
            pageSize,
            changePageSizeCallback: setPageSize,
          },
        }}
        loading={loading}
        sx={{
          '& .MuiLinearProgress-colorPrimary': {
            backgroundColor: themeColors.secondary.main,
          },
        }}
      />
    </Box>
  );
};
