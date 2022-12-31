import React, { ReactElement, useEffect } from 'react';

import GoogleIcon from '@mui/icons-material/Google';
import { Button } from '@mui/material';
import { gapi } from 'gapi-script';
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';
import { FormattedMessage } from 'react-intl';

import { useAppDispatch } from 'hooks';
import { googleLogin } from 'store/actions/auth/googleLogin';
import { SocialResponse } from 'store/types/responses/SocialResponse';

const client_id = process.env.REACT_APP_GOOGLE_CLIENT_ID as string;

export const GoogleAuth = (): ReactElement => {
  const dispatch = useAppDispatch();

  const handleSuccess = (res: GoogleLoginResponse | GoogleLoginResponseOffline): void => {
    const googleRes = res as GoogleLoginResponse;

    const data: SocialResponse = {
      login: googleRes.profileObj.email,
    };

    dispatch(googleLogin(data));
  };

  const handleFailure = (): void => {};

  useEffect(() => {
    const initClient = (): void => {
      gapi.auth2.init({
        client_id,
        scope: '',
      });
    };

    gapi.load('client:auth2', initClient);
  }, []);

  return (
    <GoogleLogin
      clientId={client_id}
      onSuccess={handleSuccess}
      onFailure={handleFailure}
      isSignedIn={false}
      render={renderProps => (
        <Button
          onClick={renderProps.onClick}
          variant="outlined"
          color="secondary"
          startIcon={<GoogleIcon />}
        >
          <FormattedMessage id="app.auth.button-google.title" />
        </Button>
      )}
    />
  );
};
