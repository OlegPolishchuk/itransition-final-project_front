import React, { ReactNode, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { routes, UserRole } from 'shared';

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

    console.log('protected route rendered');

    useEffect(() => {
      if (!isUserAuth) navigate(routes.auth.login);
    }, [isUserAuth, isInitialize]);

    useEffect(() => {
      if (checkAdmin) {
        if (userRole !== UserRole.Admin && userRole !== UserRole.Manager) {
          navigate(routes.mainPage.base);
        }
      }
    }, [userRole, checkAdmin, isInitialize, navigate]);

    return <div>{children}</div>;
  },
);
