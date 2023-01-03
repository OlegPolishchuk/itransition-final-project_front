import React, { FC } from 'react';

import TwitterIcon from '@mui/icons-material/Twitter';
import { Button } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { IResolveParams, LoginSocialFacebook } from 'reactjs-social-login';

const FACEBOOK_APP_ID = process.env.REACT_APP_FACEBOOK_APP_ID as string;

type Props = {
  onResolve: ({ provider, data }: IResolveParams) => void;
};

export const FacebookAuth: FC<Props> = ({ onResolve }) => {
  return (
    <LoginSocialFacebook
      appId={FACEBOOK_APP_ID || ''}
      fieldsProfile="id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender"
      onResolve={onResolve}
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
