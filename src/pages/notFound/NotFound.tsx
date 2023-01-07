import React, { ReactElement } from 'react';

import { Box } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { Title } from 'common';

export const NotFound = (): ReactElement => {
  const wrapperStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '50px',
  };

  return (
    <Box sx={wrapperStyle}>
      <Title title={<FormattedMessage id="app.not-found.title" />} variant="h2" />
      <Title variant="h1" title="404" />
    </Box>
  );
};
