import React, {FC, useState} from 'react';
import {User} from "store/types/User";
import {DataGrid, GridColDef, GridSelectionModel} from "@mui/x-data-grid";
import {userRoles} from "shared";
import {Box} from "@mui/material";
import {useAppSelector, useThemeColors} from "hooks";
import {selectThemeMode} from "store/selectors";

type Props = {
  columns: GridColDef[];
  rows: User[];
  setSelectionModel: (newSelectionModel: GridSelectionModel) => void;
  selectionModel: GridSelectionModel;
}

export const UsersTable: FC<Props> = ({
                                        rows,
                                        columns,
                                        setSelectionModel,
                                        selectionModel
                                      }) => {

  const theme = useAppSelector(selectThemeMode);
  const themeColors = useThemeColors();

  const handleSelectRow = (newSelectionModel: GridSelectionModel) => {
    setSelectionModel(newSelectionModel);
  }

  return (
    <Box sx={{
      height: '500px',
      '& .row-role--admin': {
        backgroundColor: theme === 'light' ? '#efefef' : 'rgba(255, 255, 255, 0.08)',
      },
      '& .row-status--blocked': {
        color: '#b2b1b1'
      }
    }}>
      <DataGrid
        columns={columns}
        rows={rows}
        getRowId={(row: User) => row._id}
        pageSize={25}
        checkboxSelection
        disableSelectionOnClick
        isRowSelectable={(params) => params.row.role !== userRoles.admin}
        getRowClassName={(param) =>
          `row-role--${param.row.role} row-status--${param.row.status}`}
        isCellEditable={params => params.row.role !== userRoles.admin}
        selectionModel={selectionModel}
        onSelectionModelChange={handleSelectRow}
      />
    </Box>
  );
};
