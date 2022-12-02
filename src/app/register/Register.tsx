import React from 'react';
import {SubmitHandler} from "react-hook-form";
import {Box, Button} from "@mui/material";
import {AuthForm} from "common";
import {NavLink} from "react-router-dom";
import {routes} from "shared";
import {useThemeColors} from "hooks";

type Inputs = {
  email: string;
  password: string;
}

export const Register = () => {
  const themeColors = useThemeColors();
  const navLinkColor = themeColors.secondary.second

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data)
  }

  return (
    <Box className={'authContainer'}>

      <AuthForm submitCallback={onSubmit} buttonTitle={'Sign Up'}>
        <Button variant={'text'} color={'secondary'}>
          <NavLink
            to={routes.auth.login}
            style={{color: navLinkColor}}
          >
            Sign In
          </NavLink>
        </Button>
      </AuthForm>

    </Box>
  );
};
