import React, {useEffect} from 'react';
import {Alert, Box, Button, Snackbar, Typography} from "@mui/material";
import {SubmitHandler} from "react-hook-form";
import {AuthForm, GoogleAuth} from "common";
import {NavLink, useNavigate} from "react-router-dom";
import {routes} from "shared";
import {useAppDispatch, useAppSelector, useThemeColors} from "hooks";
import {setError} from "store/reducers";
import {loginUser} from "store/actions";
import {selectError, selectIsUserAuth} from "store/selectors";

type Inputs = {
  email: string;
  password: string;
}

export const Login = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const error = useAppSelector(selectError);
  const isUserAuth = useAppSelector(selectIsUserAuth);

  const themeColors = useThemeColors();
  const navLinkColor = themeColors.secondary.second

  const handleCLoseErrorAlert = () => {
    dispatch(setError(''));
  }


  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(loginUser(data));
  }

  useEffect(() => {
    if (isUserAuth) {
      navigate(routes.mainPage)
    }
  }, [isUserAuth])

  return (
    <Box className={'authContainer'}>

      <Typography variant={'h3'}>
        Sign In
      </Typography>

      <Box sx={{
        display: 'flex',
        padding: '20px',
        marginTop: '20px',
        boxShadow: 1,
      }}>

        <Box className={'wrapper'}>
          <GoogleAuth />
        </Box>


        <AuthForm submitCallback={onSubmit} buttonTitle={'Sign In'}>
          <Button variant={'text'} color={'secondary'}>
            <NavLink
              to={routes.auth.register}
              style={{color: navLinkColor}}
            >
              Sign Up
            </NavLink>
          </Button>
        </AuthForm>

      </Box>


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
