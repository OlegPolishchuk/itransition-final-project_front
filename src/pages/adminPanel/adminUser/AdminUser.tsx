import React, { ReactElement, useEffect } from 'react';

import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';

import { Breadcrumbs, UserInfo } from 'common';
import { useAppDispatch, useAppSelector } from 'hooks';
import { AdminUserReviews } from 'pages/adminPanel/adminUser/AdminUserReviews';
import { routes } from 'shared';
import { fetchUser } from 'store/actions/admin/fetchUser';
import { setCurrentUser } from 'store/reducers/adminReducer/adminReducer';
import { selectAdminCurrentUser, selectIsInitialize } from 'store/selectors';
import { User } from 'store/types/User/User';

export const AdminUser = (): ReactElement => {
  const dispatch = useAppDispatch();

  const isInitialize = useAppSelector(selectIsInitialize);
  const user = useAppSelector(selectAdminCurrentUser);

  const { userId } = useParams();

  useEffect(() => {
    if (isInitialize) {
      dispatch(fetchUser(userId as string));
    }

    return () => {
      dispatch(setCurrentUser({} as User));
    };
  }, [isInitialize]);

  return (
    <Box>
      <Breadcrumbs returnTo={routes.admin.main} />

      <UserInfo user={user} isMyProfile />

      <Box sx={{ padding: '30px 0' }}>
        <AdminUserReviews userId={user._id} />
      </Box>
    </Box>
  );
};
