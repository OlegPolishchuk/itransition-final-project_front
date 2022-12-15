import React, {FC} from 'react';
import {Box, Button, Container} from "@mui/material";
import {useAppDispatch} from "hooks";
import {ThemeMode} from "store/types";
import {ThemeToggle} from "common/header/themeToggle/ThemeToggle";
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import {changeTheme, logoutUser} from "store/actions";
import {NavLink, useNavigate} from "react-router-dom";
import {routes} from "shared";
import {FormattedMessage} from "react-intl";
import {LocalePicker} from "common/header/localePicker/LocalePicker";
import {AuthButton} from "common/header/authButton/AuthButton";

type Props = {
  themeMode: ThemeMode;
  isUserAuth: boolean;
}

export const Header: FC<Props> = ({themeMode, isUserAuth}) => {
  const dispatch = useAppDispatch();


  const handleChangeTheme = () => {
    dispatch(changeTheme())
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

          {/*<Box mr={'auto'}>*/}
          {/*  <nav >*/}
          {/*    <ul style={{display: 'flex', gap: '20px'}}>*/}
          {/*      <li>*/}
          {/*        <NavLink to={'/'} >*/}
          {/*          Последние*/}
          {/*        </NavLink>*/}
          {/*      </li>*/}

          {/*      <li>*/}
          {/*        <NavLink to={'/'} >*/}
          {/*          Популярыне*/}
          {/*        </NavLink>*/}
          {/*      </li>*/}

          {/*      <li>*/}
          {/*        <NavLink to={'/'} >*/}
          {/*          Последние*/}
          {/*        </NavLink>*/}
          {/*      </li>*/}
          {/*    </ul>*/}
          {/*  </nav>*/}
          {/*</Box>*/}

          <LocalePicker/>

          <ThemeToggle themeMode={themeMode} callback={handleChangeTheme}/>

          <AuthButton />

        </Container>
      </Box>
    </header>
  );
};
