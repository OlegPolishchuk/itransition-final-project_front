import React, { ReactElement, useEffect } from 'react';

import GitHubIcon from '@mui/icons-material/GitHub';
import { Button } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { useSearchParams } from 'react-router-dom';

import { useAppDispatch } from 'hooks';
import { getGithubUser } from 'store/actions';

const client_id = process.env.REACT_APP_GITHUB_CLIENT_ID as string;

const GithubURL = 'https://github.com/login/oauth/authorize';

export const GithubAuth = (): ReactElement => {
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();

  const code = searchParams.get('code') as string;

  const handleClick = (): void => {
    window.location.assign(`${GithubURL}?client_id=${client_id}`);
  };

  useEffect(() => {
    if (code) {
      dispatch(getGithubUser(code));
    }
  }, [code]);

  return (
    <Button
      fullWidth
      variant="outlined"
      color="secondary"
      startIcon={<GitHubIcon />}
      onClick={handleClick}
    >
      <FormattedMessage id="app.auth.button-github.title" />
    </Button>
  );
};
