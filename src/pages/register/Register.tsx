import React, { ReactElement } from 'react';

import { Alert, Box, Button, Snackbar, Typography } from '@mui/material';
import { SubmitHandler } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { NavLink, useNavigate } from 'react-router-dom';

import { AuthForm } from 'common';
import { useAppDispatch, useAppSelector, useThemeColors } from 'hooks';
import { routes } from 'shared';
import { registerUser } from 'store/actions';
import { clearGlobalMessage, setError } from 'store/reducers';
import { selectError, selectGlobalMessage } from 'store/selectors/app';

type Inputs = {
  email: string;
  password: string;
};

export const Register = (): ReactElement => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const globalMessage = useAppSelector(selectGlobalMessage);
  const error = useAppSelector(selectError);

  const themeColors = useThemeColors();
  const navLinkColor = themeColors.secondary.second;

  const authFormButtonTitle = <FormattedMessage id="app.auth.button-register.title" />;

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
      <Typography variant="h3">
        <FormattedMessage id="app.auth.register.title" />
      </Typography>

      <AuthForm submitCallback={onSubmit} buttonTitle={authFormButtonTitle}>
        <Button variant="text" color="secondary">
          <NavLink to={routes.auth.login} style={{ color: navLinkColor }}>
            <FormattedMessage id="app.auth.button-login.title" />
          </NavLink>
        </Button>
      </AuthForm>

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={!!globalMessage}
        onClose={handleCloseSuccessAlert}
      >
        <Alert
          onClose={handleCloseSuccessAlert}
          severity="success"
          sx={{ width: '100%' }}
        >
          {globalMessage}
        </Alert>
      </Snackbar>

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
