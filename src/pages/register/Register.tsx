import React from 'react';
import {SubmitHandler} from "react-hook-form";
import {Alert, Box, Button, Snackbar, Typography} from "@mui/material";
import {AuthForm} from "common";
import {NavLink, useNavigate} from "react-router-dom";
import {routes} from "shared";
import {useAppDispatch, useAppSelector, useThemeColors} from "hooks";
import {selectError, selectGlobalMessage} from "store/selectors/app";
import {registerUser} from "store/actions";
import {clearGlobalMessage, setError} from "store/reducers";


type Inputs = {
  email: string;
  password: string;
}

export const Register = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const globalMessage = useAppSelector(selectGlobalMessage);
  const error = useAppSelector(selectError);

  const themeColors = useThemeColors();
  const navLinkColor = themeColors.secondary.second;

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data)
    dispatch(registerUser(data));
  }

  const handleCloseSuccessAlert = () => {
    dispatch(clearGlobalMessage());

    navigate(routes.auth.login);
  }

  const handleCLoseErrorAlert = () => {
    dispatch(setError(''));
  }

  return (
    <Box className={'authContainer'}>

      <Typography variant={'h3'}>
        Sign Up
      </Typography>

      <AuthForm submitCallback={onSubmit} buttonTitle={'Sign Up'}>
        <Button variant={'text'} color={'secondary'}>
          <NavLink
            to={routes.auth.login}
            style={{color: navLinkColor}}
          >
            Sign In
          </NavLink>
        </Button>
      </AuthForm>

      <Snackbar
        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
        open={!!globalMessage}
        onClose={handleCloseSuccessAlert}
      >
        <Alert onClose={handleCloseSuccessAlert} severity="success" sx={{width: '100%'}}>
          {globalMessage}
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
        open={!!error}
        onClose={handleCLoseErrorAlert}
      >
        <Alert onClose={handleCLoseErrorAlert} severity="error" sx={{width: '100%'}}>
          {error}
        </Alert>
      </Snackbar>

    </Box>
  );
};
