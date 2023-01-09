import React, { ReactElement } from 'react';

import { Box, Button, Typography } from '@mui/material';
import { SubmitHandler } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { NavLink, useNavigate } from 'react-router-dom';

import { AuthForm, CustomSnackbar } from 'common';
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
