import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "hooks";
import {selectCurrentUser, selectIsInitialize} from "store/selectors";
import {fetchUser} from "store/actions/users/fetchUser";
import {Box} from "@mui/material";
import {UserInfo} from "common";

export const AdminUser = () => {
  const dispatch = useAppDispatch();

  const isInitialize = useAppSelector(selectIsInitialize);
  const user = useAppSelector(selectCurrentUser);

  const {userId} = useParams();

  useEffect(() => {
    if (!user._id) {
      dispatch(fetchUser(userId as string))
    }
  }, [isInitialize, user])

  return (
    <Box className={'USERINFO'}>
      <UserInfo user={user} />
    </Box>
  );
};
