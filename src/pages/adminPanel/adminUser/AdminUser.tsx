import React, { ReactElement, useEffect } from 'react';

import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';

import { Breadcrumbs, UserInfo } from 'common';
import { useAppDispatch, useAppSelector } from 'hooks';
import { AdminUserReviews } from 'pages/adminPanel/adminUser/AdminUserReviews';
import { routes } from 'shared';
import { fetchUser } from 'store/actions/admin/fetchUser';
import { setCurrentUser } from 'store/reducers/adminReducer/adminReducer';
import { selectAdminCurrentUser } from 'store/selectors';
import { User } from 'store/types/User/User';

export const AdminUser = (): ReactElement => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectAdminCurrentUser);

  const { userId } = useParams();

  useEffect(() => {
    dispatch(fetchUser(userId as string));

    return () => {
      dispatch(setCurrentUser({} as User));
    };
  }, []);

  return (
    <Box>
      <Breadcrumbs returnTo={routes.admin.main} />

      <UserInfo key={`${user._id}_${user.userName}`} user={user} isMyProfile />

      <Box sx={{ padding: '30px 0' }}>
        <AdminUserReviews userId={user._id} />
      </Box>
    </Box>
  );
};
