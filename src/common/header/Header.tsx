import React, {FC} from 'react';
import {Box, Button, Container} from "@mui/material";
import {useAppDispatch} from "hooks";
import {ThemeMode} from "store/types";
import {ThemeToggle} from "common/header/themeToggle/ThemeToggle";
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import {changeTheme, logoutUser} from "store/actions";
import {useNavigate} from "react-router-dom";
import {routes} from "shared";
import {FormattedMessage} from "react-intl";
import {LocalePicker} from "common/header/localePicker/LocalePicker";

type Props = {
  themeMode: ThemeMode;
  isUserAuth: boolean;
}

export const Header: FC<Props> = ({themeMode, isUserAuth}) => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleChangeTheme = () => {
    dispatch(changeTheme())
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
          alignItems: 'center',
          padding: '10px',
          gap: '30px',
        }}>

          <LocalePicker/>

          <ThemeToggle themeMode={themeMode} callback={handleChangeTheme}/>

          {isUserAuth
            ? (
              <Button
                variant={'outlined'}
                onClick={handleLogout}
                endIcon={<ExitToAppOutlinedIcon/>}
              >
                <FormattedMessage id='app.header.button.logout.title' />
              </Button>
            )
            : (
              <Button
                variant={'outlined'}
                onClick={handleRedirectToLogin}
                endIcon={<LoginOutlinedIcon/>}
              >
                <FormattedMessage id='app.header.button.login.title'/>
              </Button>
            )
          }

        </Container>
      </Box>
    </header>
  );
};
