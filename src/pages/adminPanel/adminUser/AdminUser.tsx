import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "hooks";
import {selectAdminCurrentUser, selectIsInitialize} from "store/selectors";
import {fetchUser} from "store/actions/admin/fetchUser";
import {Box} from "@mui/material";
import {Breadcrumbs, UserInfo} from "common";
import {setCurrentUser} from "store/reducers/adminReducer/adminReducer";
import {User} from "store/types/User/User";
import {AdminUserReviews} from "pages/adminPanel/adminUser/AdminUserReviews";
import {routes} from "shared";

export const AdminUser = () => {
  console.log('AdminUser')
  const dispatch = useAppDispatch();

  const isInitialize = useAppSelector(selectIsInitialize);
  const user = useAppSelector(selectAdminCurrentUser);

  const {userId} = useParams();


  useEffect(() => {
    if (isInitialize) {
      dispatch(fetchUser(userId as string))
    }

    return () => {
      dispatch(setCurrentUser({} as User))
    }
  }, [isInitialize])


  return (
    <Box>

      <Breadcrumbs returnTo={routes.admin.main}/>

      <UserInfo
        user={user}
        isMyProfile
      />

      <Box sx={{padding: '30px 0'}}>
        <AdminUserReviews userId={user._id} />
      </Box>

    </Box>
  );
};
