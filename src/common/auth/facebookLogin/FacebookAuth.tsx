import React, { ReactElement } from 'react';

import TwitterIcon from '@mui/icons-material/Twitter';
import { Button } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { IResolveParams, LoginSocialFacebook } from 'reactjs-social-login';

import { useAppDispatch } from 'hooks';
import { facebookLogin } from 'store/actions';
import { SocialResponse } from 'store/types';

const FACEBOOK_APP_ID = process.env.REACT_APP_FACEBOOK_APP_ID as string;

export const FacebookAuth = (): ReactElement => {
  const dispatch = useAppDispatch();

  const handleResolve = ({ data }: IResolveParams): void => {
    const userData: SocialResponse = {
      login: data?.id,
      name: data?.name,
      avatar_url: data?.picture.data.url,
    };

    dispatch(facebookLogin(userData));
  };

  return (
    <LoginSocialFacebook
      appId={FACEBOOK_APP_ID || ''}
      fieldsProfile="id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender"
      onResolve={handleResolve}
      onReject={err => {
        console.log(err);
      }}
    >
      <Button fullWidth variant="outlined" color="secondary" startIcon={<TwitterIcon />}>
        <FormattedMessage id="app.auth.button-facebook.title" />
      </Button>
    </LoginSocialFacebook>
  );
};
