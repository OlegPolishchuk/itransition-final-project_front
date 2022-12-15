import React from 'react';
import {NavLink} from "react-router-dom";
import {routes} from "shared";
import {Box} from "@mui/material";
import {useAppSelector, useThemeColors} from "hooks";
import {selectThemeMode} from "store/selectors";
import {FormattedMessage} from "react-intl";

export const MainNav = () => {
  const theme = useAppSelector(selectThemeMode);
  const colors = useThemeColors();

  const navLinkStyles = {
    fontSize: '18px',
    color: theme === 'dark' ? '#fff' : colors.primary.second
  }

  const activeNavLinkStyles = {...navLinkStyles, color: colors.secondary.main}

  const activeNavLink = ({isActive}: {isActive: boolean}) =>
    isActive ? activeNavLinkStyles : navLinkStyles

  return (
    <Box sx={{margin: '30px 0'}}>
      <nav>
        <ul style={{display: 'flex', gap: '30px'}}>

          <li>
            <NavLink style={activeNavLink} to={routes.mainPage.base} end>
              <FormattedMessage id='app.navigation-main.latest.title' />
            </NavLink>
          </li>

          <li>
            <NavLink style={activeNavLink} to={routes.mainPage.popular}>
              <FormattedMessage id='app.navigation-main.popular.title' />
            </NavLink>
          </li>

        </ul>
      </nav>
    </Box>
  );
};
