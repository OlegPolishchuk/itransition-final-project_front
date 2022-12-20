import React, {FC} from 'react';
import {Route, Routes} from 'react-router-dom';
import {routes} from "shared";
import {
  AdminPanel,
  AdminUser,
  AdminUsersList,
  Login,
  Main,
  ProtectedRoute,
  Register,
  CurrentReview, Profile
} from "pages";
import {UserRole} from "store/types";
import {Reviews} from 'common';


type Props = {
  isUserAuth: boolean;
  isInitialize: boolean;
  userRole: UserRole;
}

export const AppRoutes: FC<Props> = ({isUserAuth, userRole, isInitialize}) => {
  console.log('App Routes')
  return (
    <Routes>
      <Route path={routes.auth.register} element={<Register/>}/>
      <Route path={routes.auth.login} element={<Login/>}/>

      <Route path={routes.mainPage.base} element={<Main/>}>
        <Route index element={<Reviews/>}/>
        <Route path={routes.mainPage.popular} element={<Reviews/>}/>
        <Route path={`${routes.review}/:reviewId`} element={<CurrentReview/>}/>
      </Route>

      <Route
        path={`${routes.profile.myProfile}/:id`}
        element={
          <ProtectedRoute
            isUserAuth={isUserAuth}
          >
            <Profile/>
          </ProtectedRoute>
        }
      />

      <Route
        path={`${routes.profile.base}/:id`}
        element={<Profile/>}
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
          element={<CurrentReview/>}
        />

      </Route>


      <Route path={routes.notFound} element={<div>Not Found</div>}/>
    </Routes>
  );
};
