import React from 'react';
import {Button} from "@mui/material";
import {useAppDispatch, useAppSelector} from "hooks";
import {selectUser} from "store/selectors";
import {getProfile} from "store/actions";
import {NavLink} from "react-router-dom";
import {routes} from "shared";

export const Main = () => {
  const dispatch = useAppDispatch();
  const {token} = useAppSelector(selectUser);

  const handleClick = () => {
    dispatch(getProfile(token))
  }

  return (
    <div>
      <h1>Protected check authorization headers</h1>

      <Button onClick={handleClick}>Refresh Profile</Button>

      <NavLink to={routes.protectedRoute} >to Protected</NavLink>
      <NavLink to={routes.admin.main} >to admin</NavLink>
    </div>
  );
};
