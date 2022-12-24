import React from 'react';
import {routes} from "shared";
import {Box} from "@mui/material";
import {useAppSelector, useThemeColors} from "hooks";
import {selectThemeMode} from "store/selectors";
import {NavLink} from "react-router-dom";
import {FormattedMessage} from "react-intl";

export const AdminNav = () => {
  const theme = useAppSelector(selectThemeMode);
  const colors = useThemeColors();

  const navLinkStyles = {
    fontSize: '16px',
    color: theme === 'dark' ? '#fff' : colors.primary.second,
    borderBottom: '2px solid transparent'
  }
  const activeNavLinkStyles = {
    ...navLinkStyles,
    color: colors.secondary.main,
    borderBottom: '2px solid currentColor'
  }

  const activeNavLink = ({isActive}: { isActive: boolean }) =>
    isActive ? activeNavLinkStyles : navLinkStyles

  return (
    <Box sx={{
      display: 'flex',
      gap: '30px',
    }}>
      <NavLink style={activeNavLink}  to={routes.admin.main} end >
        <FormattedMessage id='app.admin.navigation.users.title'/>
      </NavLink>

      <NavLink style={activeNavLink} to={routes.admin.tags} >
        <FormattedMessage id='app.admin.navigation.tags.title'/>
      </NavLink>
    </Box>
  );
};
