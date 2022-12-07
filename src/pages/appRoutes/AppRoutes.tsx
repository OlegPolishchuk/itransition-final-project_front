import React, {FC} from 'react';
import {Route, Routes} from 'react-router-dom';
import {routes} from "shared";
import {AdminPanel, Login, Main, ProtectedRoute, Register} from "pages";

import {Protected} from "pages";
import {UserRole} from "store/types/User";


type Props = {
  isUserAuth: boolean;
  userRole: UserRole;
}

export const AppRoutes: FC<Props> = ({isUserAuth, userRole}) => {

  return (
    <Routes>
      <Route path={routes.auth.register} element={<Register />}/>
      <Route path={routes.auth.login} element={<Login />}/>

      <Route
        path={routes.mainPage}
        element={<ProtectedRoute isUserAuth={isUserAuth} children={<Main />} />}
      />

      <Route
        path={routes.admin.main}
        element={<ProtectedRoute
          isUserAuth={isUserAuth}
          isCheckAdmin
          userRole={userRole}
          children={<AdminPanel />}
        />}
      />

      <Route path={routes.notFound} element={<div>Not Found</div>}/>
      <Route path={routes.protectedRoute} element={<Protected />}/>
    </Routes>
  );
};
