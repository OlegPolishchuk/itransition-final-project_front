import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "hooks";
import {
  selectIsReviewLoading,
  selectReviews,
  selectSelectedUser,
  selectUser
} from "store/selectors";
import {Box, Button} from "@mui/material";
import {Breadcrumbs, Comments, Loader, ReviewItem} from "common";
import {routes} from "shared";
import {setEditableReview} from "store/reducers/rewiewsReducer/reviewsSlice";
import {closeConnection, createConnection, fetchReviews} from "store/actions";

export const CurrentReview = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const {reviewId} = useParams();

  const review = useAppSelector(selectReviews)[0];
  const isLoading = useAppSelector(selectIsReviewLoading);
  const user = useAppSelector(selectUser);
  const selectedUser = useAppSelector(selectSelectedUser);

  const userRole = user.role;

  const userId = userRole === 'admin' ? selectedUser._id : user._id;
  const userAvatar = userRole === 'admin' ? selectedUser.avatar : user.avatar;
  const userName = userRole === 'admin' ? selectedUser.avatar : user.avatar;


  const handleEditReview = () => {
    dispatch(setEditableReview(review))

    navigate(routes.review.edit)
  }

  useEffect(() => {
    dispatch(fetchReviews({reviewId}))
    dispatch(createConnection({userId, reviewId: reviewId as string}))

    return () => {
      dispatch(closeConnection())
      console.log('unmount')
    }
  }, [])


  return (
    <Box>

      <Breadcrumbs/>

      {isLoading
        ? (<Loader/>)
        : (
          <Box>
            {(userRole === 'admin' || userId === review.userId) && (
              <Box sx={{textAlign: 'end', marginBottom: '30px'}}>
                <Button
                  color={'error'}
                  variant={'contained'}
                  onClick={handleEditReview}
                >
                  Edit Review
                </Button>
              </Box>
            )}

            <ReviewItem review={review} isHide={false}/>

            <Box mt={'50px'}>
              <Comments
                userId={userId}
                userAvatar={userAvatar}
                userName={userName}
              />
            </Box>
          </Box>
        )
      }

    </Box>
  );
};
