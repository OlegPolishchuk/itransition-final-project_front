import React, { ReactElement, ReactNode } from 'react';

import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';

import { formatMessage } from 'shared';

const localeMessage = formatMessage('dialog.button-');

type Props = {
  open: boolean;
  acceptCallback: () => void;
  canselCallback: () => void;
  children: ReactNode;
  acceptButtonTitle?: string;
  canselButtonTitle?: string;
};

export const CustomDialog = ({
  canselCallback,
  acceptCallback,
  open,
  children,
  acceptButtonTitle,
  canselButtonTitle,
}: Props): ReactElement => {
  return (
    <Dialog
      open={open}
      onClose={canselCallback}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent sx={style.content}>{children}</DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={canselCallback}>
          {canselButtonTitle || localeMessage('cansel')}
        </Button>
        <Button variant="outlined" color="error" onClick={acceptCallback} autoFocus>
          {acceptButtonTitle || localeMessage('access')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const style = {
  content: {
    minWidth: '300px',
  },
};
