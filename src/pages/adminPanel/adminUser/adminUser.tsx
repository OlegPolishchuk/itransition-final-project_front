import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "hooks";
import {selectCurrentUser, selectIsInitialize, selectReviews} from "store/selectors";
import {fetchUser} from "store/actions/users/fetchUser";
import {Box} from "@mui/material";
import {Breadcrumbs, UserInfo} from "common";
import {setCurrentUser} from "store/reducers/adminReducer/adminReducer";
import {User} from "store/types/User";

export const AdminUser = () => {
  console.log('AdminUser')
  const dispatch = useAppDispatch();

  const isInitialize = useAppSelector(selectIsInitialize);
  const user = useAppSelector(selectCurrentUser);
  const reviews = useAppSelector(selectReviews);

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

      <Breadcrumbs />

      <UserInfo user={user}/>

      <Box>

        {reviews.map(review => (
          <div key={review.userId + "" + review.title}>
            <div>{review.title}</div>
            <div>{review.subtitle}</div>
            <div>{review.tag}</div>
            <div>{review.body}</div>
            <div>{review.created}</div>
            <br/>
          </div>
        ))}

      </Box>

    </Box>
  );
};
