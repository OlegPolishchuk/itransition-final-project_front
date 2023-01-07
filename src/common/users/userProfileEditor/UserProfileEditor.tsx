import React, { forwardRef } from 'react';

import {
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';

import { useThemeColors } from 'hooks';
import { UserRole, UserStatus } from 'shared';
import { CommonFieldList } from 'store/types/User/UserFieldsList';
import { CustomTheme } from 'theme';

type Props = {
  field: CommonFieldList;
  userCopy: { [key: string]: any };
  handleUserRoleChange: (event: SelectChangeEvent) => void;
  handleChangeUserStatus: (event: SelectChangeEvent) => void;
  fieldColor?: string;
  error: string;
};

export const UserProfileEditor = forwardRef<HTMLInputElement, Props>(
  (
    { field, userCopy, handleUserRoleChange, handleChangeUserStatus, fieldColor, error },
    usernameRef,
  ) => {
    const themeColors = useThemeColors();

    let resultJSX;

    if (field.editable) {
      if (field.value === 'userName') {
        resultJSX = (
          <div style={style.fieldWrapper}>
            <TextField
              inputRef={usernameRef}
              size="small"
              defaultValue={userCopy[field.value]}
            />
            {error && (
              <Typography
                component="span"
                variant="subtitle2"
                sx={style.error(themeColors)}
              >
                {error}
              </Typography>
            )}
          </div>
        );
      }
      if (field.value === 'role') {
        resultJSX = (
          <Select
            value={userCopy[field.value]}
            onChange={handleUserRoleChange}
            size="small"
          >
            <MenuItem value={UserRole.User}>{UserRole.User}</MenuItem>
            <MenuItem value={UserRole.Manager}>{UserRole.Manager}</MenuItem>
          </Select>
        );
      }

      if (field.value === 'status') {
        resultJSX = (
          <Select
            value={userCopy[field.value]}
            onChange={handleChangeUserStatus}
            size="small"
          >
            <MenuItem value={UserStatus.Active}>{UserStatus.Active}</MenuItem>
            <MenuItem value={UserStatus.Blocked}>{UserStatus.Blocked}</MenuItem>
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

const style = {
  fieldWrapper: { position: 'relative' as const },

  error: (colors: CustomTheme) => ({
    position: 'absolute',
    bottom: '-41px',
    right: '0',
    color: colors.success.main,
  }),
};
