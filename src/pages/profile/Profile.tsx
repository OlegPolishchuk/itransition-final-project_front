import React, { ReactElement, useEffect } from 'react';

import { Box, Container, Divider } from '@mui/material';
import { useParams } from 'react-router-dom';

import { Breadcrumbs, UserInfo, UserReviews } from 'common';
import { useAppDispatch, useAppSelector } from 'hooks';
import { UserRole } from 'shared';
import { fetchUser } from 'store/actions';
import { selectSelectedUser, selectUser, selectUserRole } from 'store/selectors';

export const Profile = (): ReactElement => {
  const dispatch = useAppDispatch();

  console.log('profile rendered');
  const selectedUser = useAppSelector(selectSelectedUser);
  const user = useAppSelector(selectUser);
  const userRole = useAppSelector(selectUserRole);

  const { id } = useParams();

  const isMyProfile =
    user._id === id || userRole === UserRole.Admin || userRole === UserRole.Manager;

  useEffect(() => {
    dispatch(fetchUser(id as string));
  }, [id]);

  return (
    <Container sx={{ paddingBottom: '50px' }}>
      <Box mb="50px">
        <Breadcrumbs />
      </Box>

      <UserInfo user={selectedUser} isMyProfile={isMyProfile} />

      <Divider sx={{ margin: '50px 0' }} />

      <Box mt="50px">
        <UserReviews userId={selectedUser._id} isMyProfile={isMyProfile} />
      </Box>
    </Container>
  );
};
