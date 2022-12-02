import React from 'react';
import {Box, Button} from "@mui/material";
import {SubmitHandler} from "react-hook-form";
import {AuthForm} from "common";
import {NavLink} from "react-router-dom";
import {routes} from "shared";
import {useThemeColors} from "hooks";

type Inputs = {
  email: string;
  password: string;
}

export const Login = () => {
  const themeColors = useThemeColors();
  const navLinkColor = themeColors.secondary.second

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data)
  }

  return (
    <Box className={'authContainer'}>

      <AuthForm submitCallback={onSubmit} buttonTitle={'Sign In'}>
        <Button variant={'text'} color={'secondary'}>
          <NavLink
            to={routes.auth.register}
            style={{color: navLinkColor}}
          >
            Sign Up
          </NavLink>
        </Button>
      </AuthForm>

    </Box>
  );
};
