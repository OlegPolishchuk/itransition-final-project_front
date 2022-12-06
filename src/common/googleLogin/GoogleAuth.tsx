import React, {useEffect} from 'react';
import {gapi} from "gapi-script";
import GoogleLogin, {GoogleLoginResponse, GoogleLoginResponseOffline} from "react-google-login";
import {useAppDispatch} from "hooks";
import {GoogleLoginData} from "store/types/GoogleResponse";
import {googleLogin} from "store/actions/googleLogin";

const client_id = process.env.REACT_APP_GOOGLE_CLIENT_ID as string;


export const GoogleAuth = () => {
  const dispatch = useAppDispatch();

  const handleSuccess = (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    const googleRes = res as GoogleLoginResponse;

    const data: GoogleLoginData = {
      login: googleRes.profileObj.email,
      googleId: googleRes.googleId,
      name: googleRes.profileObj.name,
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
      buttonText={'Sign in with Google'}
      onSuccess={handleSuccess}
      onFailure={handleFailure}
      isSignedIn={false}
    />
  );
};
