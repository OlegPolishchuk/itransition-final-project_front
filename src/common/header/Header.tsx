import React, {FC, useState} from 'react';
import {Box, Button, Container, Drawer, IconButton, useMediaQuery} from "@mui/material";
import {useAppDispatch, useThemeColors} from "hooks";
import {ThemeMode} from "store/types";
import {ThemeToggle} from "common/header/themeToggle/ThemeToggle";
import {changeTheme} from "store/actions";
import {LocalePicker} from "common/header/localePicker/LocalePicker";
import {AuthButton} from "common/header/authButton/AuthButton";
import {AsideNav} from "common/navigations";
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

type Props = {
  themeMode: ThemeMode;
  isUserAuth: boolean;
}

export const Header: FC<Props> = ({themeMode, isUserAuth}) => {
  const dispatch = useAppDispatch();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const colors = useThemeColors();
  const isSmallScreen = useMediaQuery('(max-width: 900px)');

  const handleChangeTheme = () => {
    dispatch(changeTheme())
  }

  const toggleDrawer = (isOpen: boolean) => {
    setIsDrawerOpen(isOpen)
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


          {isSmallScreen
            ? (
              <>
                <IconButton
                  onClick={() => toggleDrawer(true)}
                >
                  <MenuOutlinedIcon
                  />
                </IconButton>

                <Drawer
                  anchor={'left'}
                  open={isDrawerOpen}
                  onClose={() => toggleDrawer(false)}
                >
                  <AsideNav/>
                </Drawer>
              </>
            )
            : <AuthButton/>
          }


        </Container>
      </Box>
    </header>
  );
};
