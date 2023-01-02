import React, { FC } from 'react';

import TwitterIcon from '@mui/icons-material/Twitter';
import { Button } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { IResolveParams, LoginSocialTwitter } from 'reactjs-social-login';

const REDIRECT_URI = window.location.href;
// const REDIRECT_URI = 'http://127.0.0.1:3000/api/auth/login';
const client_id = process.env.REACT_APP_TWITTER_CLIENT_ID as string;
// const client_id = process.env.REACT_APP_TWITTER_API_KEY as string;

type Props = {
  onResolve: ({ provider, data }: IResolveParams) => void;
};

export const TwitterAuth: FC<Props> = ({ onResolve }) => {
  console.log(REDIRECT_URI);

  return (
    <LoginSocialTwitter
      client_id={client_id}
      redirect_uri={REDIRECT_URI}
      // isOnlyGetCode
      isOnlyGetToken
      onResolve={onResolve}
      onReject={(err: any) => {
        console.log(`Twitter Error`, err);
      }}
    >
      <Button fullWidth variant="outlined" color="secondary" startIcon={<TwitterIcon />}>
        <FormattedMessage id="app.auth.button-twitter.title" />
      </Button>
    </LoginSocialTwitter>
  );
};
