import React, { memo, ReactElement } from 'react';

import { Route, Routes } from 'react-router-dom';

import { Reviews } from 'common';
import {
  AddNewReview,
  AdminPanel,
  AdminTags,
  AdminUser,
  AdminUsersList,
  CurrentReview,
  Login,
  Main,
  NotFound,
  Profile,
  ProtectedRoute,
  Register,
  SearchReviews,
  TagReviews,
} from 'pages';
import { routes, UserRole } from 'shared';

type Props = {
  isUserAuth: boolean;
  isInitialize: boolean;
  userRole: UserRole;
};

export const AppRoutes = memo(
  ({ isUserAuth, userRole, isInitialize }: Props): ReactElement => {
    return (
      <Routes>
        <Route path={routes.auth.register} element={<Register />} />
        <Route path={routes.auth.login} element={<Login />} />

        <Route path={routes.mainPage.base} element={<Main />}>
          <Route index element={<Reviews />} />
          <Route path={routes.mainPage.popular} element={<Reviews />} />
          <Route path={routes.mainPage.scored} element={<Reviews />} />
          <Route path={routes.mainPage.search} element={<SearchReviews />} />
          <Route path={routes.tags.base} element={<TagReviews />} />
          <Route path={`${routes.review.base}/:reviewId`} element={<CurrentReview />} />
        </Route>

        <Route
          path={routes.review.addNew}
          element={
            <ProtectedRoute isUserAuth={isUserAuth}>
              <AddNewReview />
            </ProtectedRoute>
          }
        />

        <Route
          path={routes.review.edit}
          element={
            <ProtectedRoute isUserAuth={isUserAuth}>
              <AddNewReview />
            </ProtectedRoute>
          }
        />

        <Route
          path={`${routes.profile.myProfile}/:id`}
          element={
            <ProtectedRoute isUserAuth={isUserAuth}>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route path={`${routes.profile.base}/:id`} element={<Profile />} />

        <Route
          path={routes.admin.main}
          element={
            <ProtectedRoute
              isUserAuth={isUserAuth}
              userRole={userRole}
              isInitialize={isInitialize}
              checkAdmin
            >
              <AdminPanel />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminUsersList />} />

          <Route path={`${routes.admin.user}/:userId`} element={<AdminUser />} />

          <Route path={`${routes.admin.review}/:reviewId`} element={<CurrentReview />} />

          <Route path={routes.admin.tags} element={<AdminTags />} />
        </Route>

        <Route path={routes.notFound} element={<NotFound />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  },
);
