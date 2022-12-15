import React from 'react';
import {Button} from "@mui/material";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import {FormattedMessage} from "react-intl";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import {logoutUser} from "store/actions";
import {routes} from "shared";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "hooks";
import {selectIsUserAuth} from "store/selectors";


export const AuthButton = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isUserAuth = useAppSelector(selectIsUserAuth);

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  const handleRedirectToLogin = () => {
    navigate(routes.auth.login)
  }


  return (
    <>
      {isUserAuth
        ? (
          <Button
            variant={'outlined'}
            onClick={handleLogout}
            endIcon={<ExitToAppOutlinedIcon/>}
          >
            <FormattedMessage id='app.header.button.logout.title' />
          </Button>
        )
        : (
          <Button
            variant={'outlined'}
            onClick={handleRedirectToLogin}
            endIcon={<LoginOutlinedIcon/>}
          >
            <FormattedMessage id='app.header.button.login.title'/>
          </Button>
        )
      }
    </>
  );
};
