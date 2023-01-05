import React, { memo, ReactElement } from 'react';

import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import { Button } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';

type Props = {
  returnTo?: string;
};

export const Breadcrumbs = memo(({ returnTo }: Props): ReactElement => {
  const navigate = useNavigate();

  const handleClick = (): void => {
    if (returnTo) {
      navigate(returnTo);
    } else {
      navigate(-1);
    }
  };

  const style = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '20px',
  };

  return (
    <Button
      color="secondary"
      style={style}
      startIcon={<KeyboardBackspaceOutlinedIcon />}
      onClick={handleClick}
    >
      <FormattedMessage id="app.breadcrumbs.title" />
    </Button>
  );
});
