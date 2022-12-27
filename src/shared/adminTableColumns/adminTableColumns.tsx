import {GridColDef} from "@mui/x-data-grid";
import {parseDate} from "shared/utils";
import {Box} from "@mui/material";
import {userRoles} from "shared/constants";
import {
  AdminPanelSettingsOutlined,
  LockOpenOutlined,
  SecurityOutlined
} from "@mui/icons-material";
import React from "react";

export const adminTableColumns: GridColDef[] = [
  {field: '_id', headerName: 'ID', flex: 2},
  {field: 'login', headerName: 'User', flex: 2},
  {field: 'status', headerName: 'User Status', flex: 1},
  {
    field: 'reviewsCount',
    headerName: 'Reviews',
    flex: 1,
    renderCell: ({row: {reviewsCount}}) => {
      return (
        reviewsCount || 0
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

          {role === userRoles.admin && <AdminPanelSettingsOutlined/>}
          {role === userRoles.user && <LockOpenOutlined/>}
          {role === userRoles.manager && <SecurityOutlined/>}
        </Box>
      )
    }
  },
]