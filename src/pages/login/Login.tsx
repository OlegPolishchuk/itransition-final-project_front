import React, { ReactElement, useEffect } from 'react';

import { Box, Button, Typography } from '@mui/material';
import { SubmitHandler } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';

import { AuthForm, CustomSnackbar, FacebookAuth, GithubAuth, GoogleAuth } from 'common';
import { useAppDispatch, useAppSelector, useThemeColors } from 'hooks';
import { formatMessage, routes, UserRole } from 'shared';
import { loginUser } from 'store/actions';
import { setError } from 'store/reducers';
import { selectError, selectIsUserAuth, selectUserRole } from 'store/selectors';

type Inputs = {
  email: string;
  password: string;
};

const localeMessage = formatMessage('auth');

export const Login = (): ReactElement => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const error = useAppSelector(selectError);
  const isUserAuth = useAppSelector(selectIsUserAuth);
  const userRole = useAppSelector(selectUserRole);

  const themeColors = useThemeColors();
  const navLinkColor = themeColors.secondary.second;

  const authFormButtonTitle = localeMessage('button-login');

  const handleCLoseErrorAlert = (): void => {
    dispatch(setError(''));
  };

  const onSubmit: SubmitHandler<Inputs> = data => {
    dispatch(loginUser(data));
  };

  useEffect(() => {
    if (isUserAuth) {
      navigate(userRole === UserRole.User ? routes.mainPage.base : routes.admin.main);
    }
  }, [isUserAuth, userRole]);

  return (
    <Box className="authContainer">
      <Typography variant="h3">{localeMessage('login')}</Typography>

      <Box boxShadow={1} className="login_box">
        <Box className="wrapper">
          <GoogleAuth />

          <FacebookAuth />

          <GithubAuth />
        </Box>

        <AuthForm submitCallback={onSubmit} buttonTitle={authFormButtonTitle}>
          <Button variant="text" color="secondary">
            <NavLink to={routes.auth.register} style={{ color: navLinkColor }}>
              {localeMessage('button-register')}
            </NavLink>
          </Button>
        </AuthForm>
      </Box>

      <CustomSnackbar
        open={!!error}
        closeCallback={handleCLoseErrorAlert}
        message={error}
      />
    </Box>
  );
};
