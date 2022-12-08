import React, {FC} from 'react';
import {Box, Typography} from "@mui/material";
import {User} from "store/types/User";
import {useAppSelector, useThemeColors} from "hooks";
import {userFields, userRoles} from "shared";
import {selectThemeMode, selectUserRole} from "store/selectors";
import {FormattedMessage} from "react-intl";

type Props = {
  user: User;
}

export const UserDescription: FC<Props> = ({user}) => {
  const themeColors = useThemeColors();
  const themeMode = useAppSelector(selectThemeMode);
  const userRole = useAppSelector(selectUserRole);

  const userCopy: {[key: string]: any} = {...user};
  const fields = userRole === userRoles.user ? userFields.user : userFields.admin;

  const fieldColor = themeMode === 'light' ? themeColors.primary.main : themeColors.secondary.main;

  const styleForInfoField = {
    display: 'flex',
    justifyContent: 'space-between',
    color: '#706f6f',
  }

  return (
    <Box sx={{
      minWidth: '300px',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    }}>

      {fields.map((field, index) => (
        <Typography
          key={`${field.value}${index}`}
          style={styleForInfoField}
        >
          <FormattedMessage id={field.title}/>

          <Typography
            color={field.value === 'role' ? themeColors.success.second : fieldColor}
            component={'span'}
          >
            {userCopy[field.value]}
          </Typography>

        </Typography>
      ))}

    </Box>
  );
};
