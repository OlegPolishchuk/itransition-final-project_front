import React, { ReactNode, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { routes, userRoles } from 'shared';
import { UserRole } from 'store/types';

type Props = {
  isUserAuth: boolean;
  children: ReactNode;
  userRole?: UserRole;
  checkAdmin?: boolean;
  isInitialize?: boolean;
};

export const ProtectedRoute = React.memo(
  ({ isUserAuth, children, userRole, isInitialize, checkAdmin }: Props) => {
    const navigate = useNavigate();

    useEffect(() => {
      if (!isUserAuth) navigate(routes.auth.login);
    }, [isUserAuth, isInitialize]);

    useEffect(() => {
      if (checkAdmin) {
        if (userRole !== userRoles.admin && userRole !== userRoles.manager) {
          navigate(routes.mainPage.base);
        }
      }
    }, [userRole, checkAdmin, isInitialize, navigate]);

    return <div>{children}</div>;
  },
);
