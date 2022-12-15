import React from 'react';
import {Container, CssBaseline} from "@mui/material";
import {useAppDispatch, useAppSelector} from "hooks";
import {selectUser} from "store/selectors";
import {getProfile} from "store/actions";
import {Outlet} from "react-router-dom";
import {MainNav} from "common";

export const Main = () => {
  const dispatch = useAppDispatch();
  const {token} = useAppSelector(selectUser);

  const handleClick = () => {
    dispatch(getProfile(token))
  }

  return (
    <Container>
      <MainNav />

      <Outlet />

    </Container>
  );
};
