import React, { FC, useState } from 'react';

import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { Box, Container, Drawer, IconButton, useMediaQuery } from '@mui/material';

import { AuthButton } from 'common/header/authButton/AuthButton';
import { LocalePicker } from 'common/header/localePicker/LocalePicker';
import { ThemeToggle } from 'common/header/themeToggle/ThemeToggle';
import { AsideNav, MainNav } from 'common/navigations';
import { Search } from 'common/search';
import { useAppDispatch } from 'hooks';
import { changeTheme } from 'store/actions';
import { ThemeMode } from 'store/types';

type Props = {
  themeMode: ThemeMode;
};

export const Header: FC<Props> = ({ themeMode }) => {
  const dispatch = useAppDispatch();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const isSmallScreen = useMediaQuery('(max-width: 900px)');

  const handleChangeTheme = (): void => {
    dispatch(changeTheme());
  };

  const toggleDrawer =
    (isOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setIsDrawerOpen(isOpen);
    };

  const navCallback = (): void => {
    setIsDrawerOpen(false);
  };

  return (
    <header>
      <Box boxShadow={2}>
        <Container
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            padding: '10px',
            gap: '30px',
            marginBottom: '50px',
          }}
        >
          {!isSmallScreen && (
            <Box mr="auto">
              <MainNav />
            </Box>
          )}

          <LocalePicker />

          <ThemeToggle themeMode={themeMode} callback={handleChangeTheme} />

          {isSmallScreen ? (
            <>
              <IconButton onClick={toggleDrawer(true)}>
                <MenuOutlinedIcon />
              </IconButton>

              <Drawer
                anchor="left"
                open={isDrawerOpen}
                onClose={toggleDrawer(false)}
                onClick={navCallback}
              >
                <AsideNav />
              </Drawer>
            </>
          ) : (
            <AuthButton />
          )}
        </Container>
      </Box>

      {isSmallScreen && (
        <Container>
          <Box mb="50px" textAlign="end">
            <Search />
          </Box>
        </Container>
      )}
    </header>
  );
};
