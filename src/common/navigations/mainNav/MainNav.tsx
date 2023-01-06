import React, { FC } from 'react';

import { useMediaQuery } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { NavLink } from 'react-router-dom';

import { useAppSelector, useThemeColors } from 'hooks';
import { routes, UserRole } from 'shared';
import {
  selectIsUserAuth,
  selectThemeMode,
  selectUser,
  selectUserRole,
} from 'store/selectors';

type Props = {
  variant?: 'vertical' | 'horizontal';
  callback?: () => void;
};

export const MainNav: FC<Props> = ({ variant = 'horizontal', callback }) => {
  const isUserAuth = useAppSelector(selectIsUserAuth);
  const userRole = useAppSelector(selectUserRole);
  const user = useAppSelector(selectUser);

  const theme = useAppSelector(selectThemeMode);
  const colors = useThemeColors();

  const isSmallScreen = useMediaQuery('(max-width: 900px)');

  const listStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: variant === 'vertical' ? 'column' : 'row',
    gap: '30px',
  };

  const profileLinkStyle = {
    marginLeft: isSmallScreen ? '0' : '30px',
    marginTop: isSmallScreen ? '30px' : '0',
  };

  const navLinkStyles = {
    fontSize: '18px',
    color: theme === 'dark' ? '#fff' : colors.primary.second,
  };

  const activeNavLinkStyles = { ...navLinkStyles, color: colors.secondary.main };

  const activeNavLink = ({
    isActive,
  }: {
    isActive: boolean;
  }): { color: string; fontSize: string } =>
    isActive ? activeNavLinkStyles : navLinkStyles;

  const handleClick = (): void => {
    if (callback) {
      callback();
    }
  };

  return (
    <nav>
      <ul style={listStyle}>
        <li>
          <NavLink
            onClick={handleClick}
            style={activeNavLink}
            to={routes.mainPage.base}
            end
          >
            <FormattedMessage id="app.navigation-main.latest.title" />
          </NavLink>
        </li>

        <li>
          <NavLink
            onClick={handleClick}
            style={activeNavLink}
            to={routes.mainPage.popular}
          >
            <FormattedMessage id="app.navigation-main.popular.title" />
          </NavLink>
        </li>

        <li>
          <NavLink
            onClick={handleClick}
            style={activeNavLink}
            to={routes.mainPage.scored}
            end
          >
            <FormattedMessage id="app.navigation-main.scored.title" />
          </NavLink>
        </li>

        {isUserAuth && (
          <div>
            {userRole === UserRole.Admin || userRole === UserRole.Manager ? (
              <li style={profileLinkStyle}>
                <NavLink
                  onClick={handleClick}
                  style={activeNavLink}
                  to={routes.admin.main}
                >
                  <FormattedMessage id="app.navigation-main.admin-panel.title" />
                </NavLink>
              </li>
            ) : (
              <li style={profileLinkStyle}>
                <NavLink
                  onClick={handleClick}
                  style={activeNavLink}
                  to={`${routes.profile.myProfile}/${user._id}`}
                >
                  <FormattedMessage id="app.navigation-main.profile.title" />
                </NavLink>
              </li>
            )}
          </div>
        )}
      </ul>
    </nav>
  );
};
