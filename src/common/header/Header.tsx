import React, {FC} from 'react';
import {Box, Button, Container, IconButton} from "@mui/material";
import {useAppDispatch} from "hooks";
import {ThemeMode} from "store/types/AppState";
import {toggleTheme} from "store/reducers/appReducer/appSlice";
import {ThemeToggle} from "common/header/themeToggle/ThemeToggle";
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import {logoutUser} from "store/actions";
import {NavLink, useNavigate} from "react-router-dom";
import {routes} from "shared";

type Props = {
  themeMode: ThemeMode;
  isUserAuth: boolean;
}

export const Header: FC<Props> = ({themeMode, isUserAuth}) => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleChangeTheme = () => {
    dispatch(toggleTheme())
  }

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  const handleRedirectToLogin = () => {
    navigate(routes.auth.login)
  }

  return (
    <header>
      <Box boxShadow={2}>
        <Container sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: '10px 0',
          gap: '30px',
        }}>

          <ThemeToggle themeMode={themeMode} callback={handleChangeTheme} />

          {isUserAuth
            ? (
            <Button
              variant={'outlined'}
              onClick={handleLogout}
              endIcon={<ExitToAppOutlinedIcon />}
            >
              Logout
            </Button>
          )
          : (
            <Button
              variant={'outlined'}
              onClick={handleRedirectToLogin}
              endIcon={<LoginOutlinedIcon />}
            >
              Login
            </Button>
            )
          }

        </Container>
      </Box>
    </header>
  );
};
