import React, { FC } from 'react';

import { useMediaQuery } from '@mui/material';
import { NavLink } from 'react-router-dom';

import { useAppSelector, useThemeColors } from 'hooks';
import { formatMessage, routes, UserRole } from 'shared';
import {
  selectIsUserAuth,
  selectThemeMode,
  selectUser,
  selectUserRole,
} from 'store/selectors';

const localeMessage = formatMessage('navigation-main');

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
            {localeMessage('latest')}
          </NavLink>
        </li>

        <li>
          <NavLink
            onClick={handleClick}
            style={activeNavLink}
            to={routes.mainPage.popular}
          >
            {localeMessage('popular')}
          </NavLink>
        </li>

        <li>
          <NavLink
            onClick={handleClick}
            style={activeNavLink}
            to={routes.mainPage.scored}
            end
          >
            {localeMessage('scored')}
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
                  {localeMessage('admin-panel')}
                </NavLink>
              </li>
            ) : (
              <li style={profileLinkStyle}>
                <NavLink
                  onClick={handleClick}
                  style={activeNavLink}
                  to={`${routes.profile.myProfile}/${user._id}`}
                >
                  {localeMessage('profile')}
                </NavLink>
              </li>
            )}
          </div>
        )}
      </ul>
    </nav>
  );
};
