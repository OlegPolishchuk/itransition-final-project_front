import React, {FC} from 'react';
import {Button} from "@mui/material";
import {useAppDispatch} from "hooks";
import {IResolveParams, LoginSocialTwitter} from "reactjs-social-login";
import TwitterIcon from '@mui/icons-material/Twitter';

const REDIRECT_URI = window.location.href;
const client_id = process.env.REACT_APP_TWITTER_API_KEY as string;

type Props = {
  onResolve: ({provider, data}: IResolveParams) => void
}

export const TwitterAuth: FC<Props> = ({onResolve}) => {

  return (
    <LoginSocialTwitter
      client_id={client_id}
      redirect_uri={REDIRECT_URI}
      onResolve={onResolve}
      onReject={(err: any) => {
        console.log(err)
      }}
    >
     <Button
       fullWidth
       variant={'outlined'}
       color={'secondary'}
       startIcon={<TwitterIcon />}
     >
       Sign in with twitter
     </Button>
    </LoginSocialTwitter>
  );
};