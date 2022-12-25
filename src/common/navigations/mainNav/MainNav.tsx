import React, {FC} from 'react';
import {NavLink} from "react-router-dom";
import {routes} from "shared";
import {useAppSelector, useThemeColors} from "hooks";
import {
  selectIsUserAuth,
  selectThemeMode,
  selectUser,
  selectUserRole
} from "store/selectors";
import {FormattedMessage} from "react-intl";
import {useMediaQuery} from "@mui/material";

type Props = {
  variant?: 'vertical' | 'horizontal';
  callback?: () => void;
}

export const MainNav: FC<Props> = ({variant = 'horizontal', callback}) => {
  const isUserAuth = useAppSelector(selectIsUserAuth);
  const userRole = useAppSelector(selectUserRole);
  const user = useAppSelector(selectUser);

  const theme = useAppSelector(selectThemeMode);
  const colors = useThemeColors();

  const isSmallScreen = useMediaQuery('(max-width: 900px)');

  const profileLinkStyle = {
    marginLeft: isSmallScreen ? '0' : '30px',
    marginTop: isSmallScreen ? '30px' : '0',
  }


  const navLinkStyles = {
    fontSize: '18px',
    color: theme === 'dark' ? '#fff' : colors.primary.second
  }

  const activeNavLinkStyles = {...navLinkStyles, color: colors.secondary.main}

  const activeNavLink = ({isActive}: { isActive: boolean }) =>
    isActive ? activeNavLinkStyles : navLinkStyles


  const handleClick = () => {
    callback && callback();
  }


  return (
    <nav>
      <ul style={{
        display: 'flex',
        flexDirection: variant === 'vertical' ? 'column' : 'row',
        gap: '30px'
      }}>

        <li>
          <NavLink
            onClick={handleClick}
            style={activeNavLink}
            to={routes.mainPage.base}
            end
          >
            <FormattedMessage id='app.navigation-main.latest.title'/>
          </NavLink>
        </li>

        <li>
          <NavLink
            onClick={handleClick}
            style={activeNavLink}
            to={routes.mainPage.popular}
          >
            <FormattedMessage id='app.navigation-main.popular.title'/>
          </NavLink>
        </li>

        <li>
          <NavLink
            onClick={handleClick}
            style={activeNavLink}
            to={routes.mainPage.scored}
            end
          >
            <FormattedMessage id='app.navigation-main.scored.title'/>
          </NavLink>
        </li>

        {isUserAuth && (
          <>
            {userRole === 'admin'
            ? (
            <li style={profileLinkStyle}>
              <NavLink
                onClick={handleClick}
                style={activeNavLink}
                to={routes.admin.main}
              >
                <FormattedMessage id='app.navigation-main.admin-panel.title'/>
              </NavLink>
            </li>
            )
            : (
            <li style={profileLinkStyle}>
              <NavLink
                onClick={handleClick}
                style={activeNavLink}
                to={`${routes.profile.myProfile}/${user._id}`}
              >
                <FormattedMessage id='app.navigation-main.profile.title'/>
              </NavLink>
            </li>
            )}
          </>
        )}

      </ul>
    </nav>
  );
};
