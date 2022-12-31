import React, { ReactElement, useCallback, useEffect, useState } from 'react';

import { Alert, Box, Button, Snackbar, Typography } from '@mui/material';
import { SubmitHandler } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { NavLink, useNavigate } from 'react-router-dom';
import { IResolveParams } from 'reactjs-social-login';

import { AuthForm, GithubAuth, GoogleAuth, TwitterAuth } from 'common';
import { useAppDispatch, useAppSelector, useThemeColors } from 'hooks';
import { routes, userRoles } from 'shared';
import { loginUser, twitterLogin } from 'store/actions';
import { getGithubUser } from 'store/actions/auth/getGithubUser';
import { setError } from 'store/reducers';
import { selectError, selectIsUserAuth, selectUserRole } from 'store/selectors';

type Inputs = {
  email: string;
  password: string;
};

export const Login = (): ReactElement => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const error = useAppSelector(selectError);
  const isUserAuth = useAppSelector(selectIsUserAuth);
  const userRole = useAppSelector(selectUserRole);

  const themeColors = useThemeColors();
  const navLinkColor = themeColors.secondary.second;

  const [provider, setProvider] = useState('');
  const [profile, setProfile] = useState<any>();

  const authFormButtonTitle = <FormattedMessage id="app.auth.button-login.title" />;

  const onLogoutSuccess = useCallback(() => {
    setProfile(null);
    setProvider('');
  }, []);

  const handleTwitterResolve = ({ provider, data }: IResolveParams): void => {
    setProvider(provider);
    setProfile(data);
  };

  const handleCLoseErrorAlert = (): void => {
    dispatch(setError(''));
  };

  const onSubmit: SubmitHandler<Inputs> = data => {
    dispatch(loginUser(data));
  };

  useEffect(() => {
    if (isUserAuth) {
      navigate(userRole === userRoles.user ? routes.mainPage.base : routes.admin.main);
    }
  }, [isUserAuth, userRole]);

  useEffect(() => {
    if (profile) {
      const { access_token } = profile;

      if (provider === 'github') {
        dispatch(getGithubUser(access_token));
      }

      if (provider === 'twitter') {
        const login = profile.username;

        dispatch(twitterLogin(login));
      }
    }

    if (profile && !isUserAuth) {
      onLogoutSuccess();
    }
  }, [profile, provider, isUserAuth]);

  return (
    <Box className="authContainer">
      <Typography variant="h3">
        <FormattedMessage id="app.auth.login.title" />
      </Typography>

      <Box boxShadow={1} className="login_box">
        <Box className="wrapper">
          <GoogleAuth />

          <TwitterAuth onResolve={handleTwitterResolve} />

          <GithubAuth onResolve={handleTwitterResolve} />
        </Box>

        <AuthForm submitCallback={onSubmit} buttonTitle={authFormButtonTitle}>
          <Button variant="text" color="secondary">
            <NavLink to={routes.auth.register} style={{ color: navLinkColor }}>
              <FormattedMessage id="app.auth.button-register.title" />
            </NavLink>
          </Button>
        </AuthForm>
      </Box>

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={!!error}
        onClose={handleCLoseErrorAlert}
      >
        <Alert onClose={handleCLoseErrorAlert} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};
