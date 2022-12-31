import React, { ReactElement } from 'react';

import { Box, Divider } from '@mui/material';

import { AuthButton } from 'common/header';
import { MainNav } from 'common/navigations/mainNav/MainNav';

export const AsideNav = (): ReactElement => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        padding: '20px',
        width: '300px',
      }}
    >
      <AuthButton />

      <Divider />

      <MainNav variant="vertical" />
    </Box>
  );
};
