import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "hooks";
import {selectSelectedUser, selectUser, selectUserRole} from "store/selectors";
import {Breadcrumbs, UserInfo, UserReviews} from "common";
import {Box, Container, Divider} from "@mui/material";
import {useParams} from "react-router-dom";
import {fetchUser} from "store/actions";

export const Profile = () => {
  const dispatch = useAppDispatch();

  const selectedUser = useAppSelector(selectSelectedUser);
  const user = useAppSelector(selectUser);
  const userRole = useAppSelector(selectUserRole);

  const {id} = useParams();

  const isMyProfile = user._id === id || userRole === 'admin' || userRole === 'manager';

  useEffect(() => {
    dispatch(fetchUser(id as string))
  }, [id])

  return (
    <Container sx={{paddingBottom: '50px'}}>

      <Box mb={'50px'}>
        <Breadcrumbs />
      </Box>


      <UserInfo
        user={selectedUser}
        isMyProfile={isMyProfile}
      />

      <Divider sx={{margin: '50px 0'}}/>

      <Box mt={'50px'}>
        <UserReviews
          userId={selectedUser._id}
          isMyProfile={isMyProfile}
        />
      </Box>

    </Container>
  );
};
