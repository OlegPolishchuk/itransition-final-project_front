import React, {ReactNode, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {routes} from "shared";
import {UserRole} from "store/types/User";
import {userRoles} from "shared";

type Props = {
  isUserAuth: boolean;
  isCheckAdmin?: boolean;
  userRole?: UserRole;
  children: ReactNode;
}

export const ProtectedRoute = React.memo(({isUserAuth, children, userRole, isCheckAdmin}: Props) => {
  const navigate = useNavigate();
  console.log(`ProtectedRoute, isUserAuth = ${isUserAuth}`)
  useEffect(() => {
    if (!isUserAuth) navigate(routes.auth.login);
  }, [isUserAuth])

  useEffect(() => {
    // console.log(`isCheckAdmin`, isCheckAdmin);
    // console.log(`userRole`, userRole)
    if (isCheckAdmin && userRole !== userRoles.admin) {
      navigate(routes.mainPage)
    }
  }, [isCheckAdmin, userRole])

  return (
    <>
      {children}
    </>)
});

