import React, {FC} from 'react';
import {Route, Routes} from 'react-router-dom';
import {routes} from "shared";
import {
  AdminPanel,
  AdminUser,
  AdminUsersList,
  LatestReviews,
  Login,
  Main, PopularReviews,
  ProtectedRoute,
  Register
} from "pages";
import {UserRole} from "store/types";


type Props = {
  isUserAuth: boolean;
  isInitialize: boolean;
  userRole: UserRole;
}

export const AppRoutes: FC<Props> =({isUserAuth, userRole, isInitialize}) => {
  console.log('App Routes')
  return (
    <Routes>
      <Route path={routes.auth.register} element={<Register/>} />
      <Route path={routes.auth.login} element={<Login/>} />
      <Route path={routes.mainPage.base} element={<Main/>} >
        <Route index element={<LatestReviews />}/>
        <Route path={routes.mainPage.popular} element={<PopularReviews />} />
      </Route>

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


      <Route path={routes.notFound} element={<div>Not Found</div>} />
    </Routes>
  );
};
