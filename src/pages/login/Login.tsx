import React, {useCallback, useEffect, useState} from 'react';
import {Alert, Box, Button, Snackbar, Typography} from "@mui/material";
import {SubmitHandler} from "react-hook-form";
import {AuthForm, GithubAuth, GoogleAuth, TwitterAuth} from "common";
import {NavLink, useNavigate} from "react-router-dom";
import {routes, userRoles} from "shared";
import {useAppDispatch, useAppSelector, useThemeColors} from "hooks";
import {setError} from "store/reducers";
import {loginUser, twitterLogin} from "store/actions";
import {selectError, selectIsUserAuth, selectUserRole} from "store/selectors";
import {IResolveParams} from "reactjs-social-login";
import {getGithubUser} from "store/actions/auth/getGithubUser";
import {FormattedMessage} from "react-intl";


type Inputs = {
  email: string;
  password: string;
}

export const Login = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const error = useAppSelector(selectError);
  const isUserAuth = useAppSelector(selectIsUserAuth);
  const userRole = useAppSelector(selectUserRole);

  const themeColors = useThemeColors();
  const navLinkColor = themeColors.secondary.second

  const [provider, setProvider] = useState('');
  const [profile, setProfile] = useState<any>();

  const authFormButtonTitle = <FormattedMessage id='app.auth.button-login.title' />

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
      navigate(userRole === userRoles.user ? routes.mainPage : routes.admin.main)
    }
  }, [isUserAuth, userRole])

  useEffect(() => {
    if (profile) {
      const {access_token} = profile;

      if (provider === 'github') {
        dispatch(getGithubUser(access_token))
      }

      if (provider === 'twitter') {
        const login = profile.username;
        console.log(`profile = `, profile)
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
        <FormattedMessage id='app.auth.login.title' />
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


        <AuthForm submitCallback={onSubmit} buttonTitle={authFormButtonTitle}>
          <Button variant={'text'} color={'secondary'}>
            <NavLink
              to={routes.auth.register}
              style={{color: navLinkColor}}
            >
              <FormattedMessage id='app.auth.button-register.title' />
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
