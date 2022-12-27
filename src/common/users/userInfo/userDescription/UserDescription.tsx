import React, {forwardRef} from 'react';
import {Box, SelectChangeEvent, Typography} from "@mui/material";
import {User} from "store/types/User/User";
import {useAppSelector, useThemeColors} from "hooks";
import {userFields, userRoles} from "shared";
import {selectThemeMode, selectUser, selectUserRole} from "store/selectors";
import {FormattedMessage} from "react-intl";
import {UserProfileEditor} from "common/users/userProfileEditor/UserProfileEditor";

type Props = {
  user: User;
  editMode: boolean;
  userCopy: { [key: string]: any };
  setUserCopy: (userCopy: { [key: string]: any }) => void;
}

export const UserDescription = forwardRef<HTMLInputElement, Props>(
  ({user, editMode, setUserCopy, userCopy}, userNameRef) => {
    const themeColors = useThemeColors();
    const themeMode = useAppSelector(selectThemeMode);
    const userRole = useAppSelector(selectUserRole);

    const currentUser = useAppSelector(selectUser);

    const fields = userRole === userRoles.admin || userRoles.manager
      ? userFields.admin
      : user._id === currentUser._id ? userFields.currentUser : userFields.user;

    const fieldColor = themeMode === 'light' ? themeColors.primary.main : themeColors.secondary.main;

    const handleUserRoleChange = (event: SelectChangeEvent) => {
      setUserCopy((user: object ) => ({...user, role: event.target.value}))
    }

    const handleChangeUserStatus = (event: SelectChangeEvent) => {
      setUserCopy((user: object ) => ({...user, status: event.target.value}))
    }

    const styleForInfoField = {
      display: 'flex',
      justifyContent: 'space-between',
      color: '#706f6f',
      height: '30px',
    }

    return (
      <Box sx={{
        minWidth: '300px',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
      }}>

        {fields.map((field, index) => (
          <Typography
            key={`${field.value}${index}`}
            style={styleForInfoField}
            component={'div'}
          >

            <FormattedMessage id={field.title}/>

            {editMode
              ? (<UserProfileEditor
                ref={userNameRef}
                field={field}
                userCopy={userCopy}
                handleChangeUserStatus={handleChangeUserStatus}
                handleUserRoleChange={handleUserRoleChange}
                fieldColor={fieldColor}
              />)
              : (<Typography
                color={field.value === 'role' ? themeColors.success.second : fieldColor}
                component={'span'}
              >
                {userCopy[field.value]}
              </Typography>)
            }

          </Typography>
        ))}

      </Box>
    );
  });
