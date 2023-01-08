import React, { ReactElement, ReactNode } from 'react';

import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import { FormattedMessage } from 'react-intl';

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
          {canselButtonTitle || <FormattedMessage id="app.dialog.button-cansel.title" />}
        </Button>
        <Button variant="outlined" color="error" onClick={acceptCallback} autoFocus>
          {acceptButtonTitle || <FormattedMessage id="app.dialog.button-access.title" />}
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
