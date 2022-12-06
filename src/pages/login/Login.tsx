import React, {useCallback, useEffect, useState} from 'react';
import {Alert, Box, Button, Grid, Snackbar, Typography} from "@mui/material";
import {SubmitHandler} from "react-hook-form";
import {AuthForm, GithubAuth, GoogleAuth, TwitterAuth} from "common";
import {NavLink, useNavigate} from "react-router-dom";
import {routes} from "shared";
import {useAppDispatch, useAppSelector, useThemeColors} from "hooks";
import {setError} from "store/reducers";
import {loginUser, twitterLogin} from "store/actions";
import {selectError, selectIsUserAuth} from "store/selectors";
import {IResolveParams} from "reactjs-social-login";
import {getGithubUser} from "store/actions/getGithubUser";


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

  const [provider, setProvider] = useState('');
  const [profile, setProfile] = useState<any>();

  const onLogoutSuccess = useCallback(() => {
    setProfile(null)
    setProvider('')
  }, [])

  const handleTwitterResolve = ({ provider, data }: IResolveParams) => {
    setProvider(provider)
    setProfile(data)
  }


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

  useEffect(() => {
    console.log(`provider, `, provider)
    if (profile) {
      const {access_token} = profile;

      if (provider === 'github') {
        dispatch(getGithubUser(access_token))
      }

      if (provider === 'twitter') {
        const login = profile.username;

        dispatch(twitterLogin(login));
      }
    }

    if (profile && !isUserAuth) {
      onLogoutSuccess();
    }
  }, [profile, provider, isUserAuth])


  return (
    <Box className={'authContainer'}>

      <Typography variant={'h3'}>
        Sign In
      </Typography>

      <Box boxShadow={1} className={'login_box'}>

        <Box className={'wrapper'}>
          <GoogleAuth />

          <TwitterAuth
            onResolve={handleTwitterResolve}
          />

          <GithubAuth
            onResolve={handleTwitterResolve}
            />

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
