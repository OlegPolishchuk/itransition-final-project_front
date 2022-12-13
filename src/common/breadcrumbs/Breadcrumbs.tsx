import React, {FC} from 'react';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import {useNavigate} from "react-router-dom";
import {Button} from "@mui/material";
import {FormattedMessage} from "react-intl";

type Props = {
  returnTo?: string;
}

export const Breadcrumbs: FC<Props> = ({returnTo}) => {
  const navigate = useNavigate();

  const handleClick = () => {

    if (returnTo) {
      navigate(returnTo)
    }
    else {navigate(-1)}
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

