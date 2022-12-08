import React, {FC} from 'react';
import {Route, Routes} from 'react-router-dom';
import {routes} from "shared";
import {
  AdminPanel,
  AdminUser,
  AdminUsersList,
  Login,
  Main,
  Protected,
  ProtectedRoute,
  Register
} from "pages";
import {UserRole} from "store/types/User";


type Props = {
  isUserAuth: boolean;
  isInitialize: boolean;
  userRole: UserRole;
}

export const AppRoutes: FC<Props> = ({isUserAuth, userRole, isInitialize}) => {

  return (
    <Routes>
      <Route path={routes.auth.register} element={<Register/>}/>
      <Route path={routes.auth.login} element={<Login/>}/>

      <Route
        path={routes.mainPage}
        element={<ProtectedRoute isUserAuth={isUserAuth} children={<Main/>}/>}
      />

      <Route
        path={routes.admin.main}
        element={
          <ProtectedRoute
            isUserAuth={isUserAuth}
            children={<AdminPanel/>}
            userRole={userRole}
            isInitialize={isInitialize}
            checkAdmin
          />}
      >
        <Route
          index
          element={<AdminUsersList/>}
        />

        <Route
          path={`${routes.admin.user}/:userId`}
          element={<AdminUser/>}
        />
      </Route>


      <Route path={routes.notFound} element={<div>Not Found</div>}/>
      <Route path={routes.protectedRoute} element={<Protected/>}/>
    </Routes>
  );
};
