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

export const AppRoutes: FC<Props> =({isUserAuth, userRole, isInitialize}) => {
  console.log('App Routes')
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
            userRole={userRole}
            isInitialize={isInitialize}
            checkAdmin
          >
            <AdminPanel/>
          </ProtectedRoute>}
      >
        <Route
          index
          element={<AdminUsersList/>}
        />

        <Route
          path={`${routes.admin.user}/:userId`}
          element={<AdminUser/>}
        />

        <Route
          path={`${routes.admin.review}/:reviewId`}
          element={<h1>Review</h1>}
        />

      </Route>


      <Route path={routes.notFound} element={<div>Not Found</div>}/>
      <Route path={routes.protectedRoute} element={<Protected/>}/>
    </Routes>
  );
};
