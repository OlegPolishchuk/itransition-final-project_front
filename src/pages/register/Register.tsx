import React, { ReactElement } from 'react';

import { Box, Button, Typography } from '@mui/material';
import { SubmitHandler } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';

import { AuthForm, CustomSnackbar } from 'common';
import { useAppDispatch, useAppSelector, useThemeColors } from 'hooks';
import { formatMessage, routes } from 'shared';
import { registerUser } from 'store/actions';
import { clearGlobalMessage, setError } from 'store/reducers';
import { selectError, selectGlobalMessage } from 'store/selectors/app';

type Inputs = {
  email: string;
  password: string;
};

const localeMessage = formatMessage('auth');

export const Register = (): ReactElement => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const globalMessage = useAppSelector(selectGlobalMessage);
  const error = useAppSelector(selectError);

  const themeColors = useThemeColors();
  const navLinkColor = themeColors.secondary.second;

  const authFormButtonTitle = localeMessage('button-register');

  const onSubmit: SubmitHandler<Inputs> = (data): void => {
    dispatch(registerUser(data));
  };

  const handleCloseSuccessAlert = (): void => {
    dispatch(clearGlobalMessage());

    navigate(routes.auth.login);
  };

  const handleCLoseErrorAlert = (): void => {
    dispatch(setError(''));
  };

  return (
    <Box className="authContainer">
      <Typography variant="h3">{localeMessage('register')}</Typography>

      <AuthForm submitCallback={onSubmit} buttonTitle={authFormButtonTitle}>
        <Button variant="text" color="secondary">
          <NavLink to={routes.auth.login} style={{ color: navLinkColor }}>
            {localeMessage('button-login')}
          </NavLink>
        </Button>
      </AuthForm>

      <CustomSnackbar
        open={!!globalMessage}
        closeCallback={handleCloseSuccessAlert}
        message={globalMessage}
      />

      <CustomSnackbar
        open={!!error}
        closeCallback={handleCLoseErrorAlert}
        message={error}
      />
    </Box>
  );
};
