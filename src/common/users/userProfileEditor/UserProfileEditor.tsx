import React, { forwardRef } from 'react';

import {
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';

import { useThemeColors } from 'hooks';
import { UserRole, userStatus } from 'shared';
import { CommonFieldList } from 'store/types/User/UserFieldsList';

type Props = {
  field: CommonFieldList;
  userCopy: { [key: string]: any };
  handleUserRoleChange: (event: SelectChangeEvent) => void;
  handleChangeUserStatus: (event: SelectChangeEvent) => void;
  fieldColor?: string;
};

export const UserProfileEditor = forwardRef<HTMLInputElement, Props>(
  (
    { field, userCopy, handleUserRoleChange, handleChangeUserStatus, fieldColor },
    usernameRef,
  ) => {
    const themeColors = useThemeColors();

    let resultJSX;

    if (field.editable) {
      if (field.value === 'userName') {
        resultJSX = (
          <TextField
            inputRef={usernameRef}
            size="small"
            defaultValue={userCopy[field.value]}
          />
        );
      }
      if (field.value === 'role') {
        resultJSX = (
          <Select value={userCopy[field.value]} onChange={handleUserRoleChange}>
            <MenuItem value={UserRole.User}>{UserRole.User}</MenuItem>
            {/* <MenuItem value={userRoles.admin}>{userRoles.admin}</MenuItem> */}
            <MenuItem value={UserRole.Manager}>{UserRole.Manager}</MenuItem>
          </Select>
        );
      }

      if (field.value === 'status') {
        resultJSX = (
          <Select value={userCopy[field.value]} onChange={handleChangeUserStatus}>
            <MenuItem value={userStatus.active}>{userStatus.active}</MenuItem>
            <MenuItem value={userStatus.blocked}>{userStatus.blocked}</MenuItem>
          </Select>
        );
      }
    } else {
      resultJSX = (
        <Typography
          color={field.value === 'role' ? themeColors.success.second : fieldColor}
          component="span"
        >
          {userCopy[field.value]}
        </Typography>
      );
    }

    return <div>{resultJSX}</div>;
  },
);
