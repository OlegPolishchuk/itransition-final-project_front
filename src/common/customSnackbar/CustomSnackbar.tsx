import React, { ReactElement } from 'react';

import { Alert, Snackbar } from '@mui/material';

type Props = {
  open: boolean;
  closeCallback: () => void;
  message: string;
};

export const CustomSnackbar = ({ open, closeCallback, message }: Props): ReactElement => {
  const fullWidthStyle = { width: '100%' };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={open}
      onClose={closeCallback}
    >
      <Alert onClose={closeCallback} severity="error" sx={fullWidthStyle}>
        {message}
      </Alert>
    </Snackbar>
  );
};
