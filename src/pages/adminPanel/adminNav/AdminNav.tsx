import React, { memo, ReactElement } from 'react';

import { Box } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { NavLink } from 'react-router-dom';

import { useAppSelector, useThemeColors } from 'hooks';
import { routes } from 'shared';
import { selectThemeMode } from 'store/selectors';

export const AdminNav = memo((): ReactElement => {
  const theme = useAppSelector(selectThemeMode);
  const colors = useThemeColors();

  const navLinkStyles = {
    fontSize: '16px',
    color: theme === 'dark' ? '#fff' : colors.primary.second,
    borderBottom: '2px solid transparent',
  };
  const activeNavLinkStyles = {
    ...navLinkStyles,
    color: colors.secondary.main,
    borderBottom: '2px solid currentColor',
  };

  const activeNavLink = ({
    isActive,
  }: {
    isActive: boolean;
  }): { color: string; fontSize: string; borderBottom: string } =>
    isActive ? activeNavLinkStyles : navLinkStyles;

  return (
    <Box
      sx={{
        display: 'flex',
        gap: '30px',
      }}
    >
      <NavLink style={activeNavLink} to={routes.admin.main} end>
        <FormattedMessage id="app.admin.navigation.users.title" />
      </NavLink>

      <NavLink style={activeNavLink} to={routes.admin.tags}>
        <FormattedMessage id="app.admin.navigation.tags.title" />
      </NavLink>
    </Box>
  );
});
