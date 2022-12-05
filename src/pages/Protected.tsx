import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "hooks";
import {Button} from "@mui/material";
import {getProfile} from "store/actions";
import {selectUser} from "store/selectors";
import {NavLink} from "react-router-dom";
import {routes} from "shared";

export const Protected = () => {
  const dispatch = useAppDispatch();
  const {token} = useAppSelector(selectUser);

  const handleClick = () => {
    console.log(token)
    dispatch(getProfile(token))

  }

  useEffect(() => {
    dispatch(getProfile(token));
  }, [])

  return (
    <div>
        <h1>Protected check authorization headers</h1>

      <Button onClick={handleClick}>Refresh Profile</Button>
      <NavLink to={routes.mainPage}>to Main</NavLink>
      </div>
  );
};
