import React, { memo, ReactElement } from 'react';

import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'hooks';
import { formatMessage, routes } from 'shared';
import { logoutUser } from 'store/actions';
import { selectIsUserAuth } from 'store/selectors';

const localeMessage = formatMessage('header.button');

export const AuthButton = memo((): ReactElement => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isUserAuth = useAppSelector(selectIsUserAuth);

  const handleLogout = (): void => {
    dispatch(logoutUser());
  };

  const handleRedirectToLogin = (): void => {
    navigate(routes.auth.login);
  };

  return (
    <div>
      {isUserAuth ? (
        <Button
          variant="outlined"
          onClick={handleLogout}
          endIcon={<ExitToAppOutlinedIcon />}
        >
          {localeMessage('logout')}
        </Button>
      ) : (
        <Button
          variant="outlined"
          onClick={handleRedirectToLogin}
          endIcon={<LoginOutlinedIcon />}
        >
          {localeMessage('login')}
        </Button>
      )}
    </div>
  );
});
