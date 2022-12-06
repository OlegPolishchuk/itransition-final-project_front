import React, {useEffect} from 'react';
import {gapi} from "gapi-script";
import GoogleLogin, {GoogleLoginResponse, GoogleLoginResponseOffline} from "react-google-login";
import {useAppDispatch} from "hooks";
import {SocialResponse} from "store/types/SocialResponse";
import {googleLogin} from "store/actions/auth/googleLogin";
import {Button} from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';
import {FormattedMessage} from "react-intl";

const client_id = process.env.REACT_APP_GOOGLE_CLIENT_ID as string;

export const GoogleAuth = () => {
  const dispatch = useAppDispatch();

  const handleSuccess = (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    const googleRes = res as GoogleLoginResponse;

    const data: SocialResponse = {
      login: googleRes.profileObj.email,
    }

    dispatch(googleLogin(data))
  }

  const handleFailure = () => {

  }

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        client_id,
        scope: '',
      })
    }

    gapi.load('client:auth2', initClient)

  }, [])

  return (
    <GoogleLogin
      clientId={client_id}
      // buttonText={'Sign in with Google'}
      onSuccess={handleSuccess}
      onFailure={handleFailure}
      isSignedIn={false}
      render={renderProps => (
        <Button
          onClick={renderProps.onClick}
          variant={'outlined'}
          color={'secondary'}
          startIcon={<GoogleIcon/>}
        >
          <FormattedMessage id='app.auth.button-google.title'/>
        </Button>
      )}
    />
  );
};
