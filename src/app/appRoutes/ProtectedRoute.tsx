import React, {FC, ReactNode, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {routes} from "shared";

type Props = {
  isUserAuth: boolean;
  children: ReactNode;
}

export const ProtectedRoute = ({isUserAuth, children}: Props) => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!isUserAuth) navigate(routes.auth.login);
  // }, [isUserAuth])

  return (
    <>
      {children}
    </>)
};

