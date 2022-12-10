import React from 'react';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import {useNavigate} from "react-router-dom";
import {Button} from "@mui/material";
import {FormattedMessage} from "react-intl";

export const Breadcrumbs = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  }

  const style = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '20px',
  }

  return (
    <Button
      color={'secondary'}
      style={style}
      startIcon={<KeyboardBackspaceOutlinedIcon />}
      onClick={handleClick}
    >
      <FormattedMessage id={'app.breadcrumbs.title'} />
    </Button>
  );
};

