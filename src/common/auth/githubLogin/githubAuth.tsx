import React, {FC} from 'react';
import {IResolveParams, LoginSocialGithub} from "reactjs-social-login";
import {Button} from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';

const REDIRECT_URI = window.location.href;
const client_id = process.env.REACT_APP_GITHUB_CLIENT_ID as string;
const client_secret = process.env.REACT_APP_GITHUB_CLIENT_SECRET as string;

type Props = {
  onResolve: ({provider, data}: IResolveParams) => void
}

export const GithubAuth: FC<Props> = ({onResolve}) => {

  return (
    <LoginSocialGithub
      isOnlyGetToken
      client_id={client_id}
      client_secret={client_secret}
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
        startIcon={<GitHubIcon />}
      >
        Sign in with Github
      </Button>
    </LoginSocialGithub>
  );
};
