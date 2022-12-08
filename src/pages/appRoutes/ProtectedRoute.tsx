import React, {ReactNode, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {routes, userRoles} from "shared";
import {UserRole} from "store/types/User";

type Props = {
  isUserAuth: boolean;
  children: ReactNode;
  userRole?: UserRole;
  checkAdmin?: boolean;
  isInitialize?: boolean;
}

export const ProtectedRoute = React.memo(({
                                            isUserAuth,
                                            children
                                            , userRole,
                                            isInitialize,
                                            checkAdmin
                                          }: Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserAuth) navigate(routes.auth.login);
  }, [isUserAuth, navigate])

  useEffect(() => {
    if (checkAdmin) {
      if (isInitialize && userRole !== userRoles.admin) {
        navigate(routes.mainPage)
      }
    }
  }, [userRole, checkAdmin, isInitialize, navigate])

  return (
    <>
      {children}
    </>)
});

