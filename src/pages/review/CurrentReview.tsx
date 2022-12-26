import React, {useEffect} from 'react';
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "hooks";
import {fetchReviews} from "store/actions";
import {
  selectIsReviewLoading,
  selectReviews,
  selectSelectedUser,
  selectUser
} from "store/selectors";
import {Box, Button} from "@mui/material";
import {BaseNavLink, Breadcrumbs, Loader, ReviewItem} from "common";
import {routes} from "shared";
import {setEditableReview} from "store/reducers/rewiewsReducer/reviewsSlice";

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

  const handleEditReview = () => {
    dispatch(setEditableReview(review))

    navigate(routes.review.edit)
  }

  useEffect(() => {
    dispatch(fetchReviews({reviewId}))
  }, [])
  return (
    <Box>

      <Breadcrumbs />

      {isLoading
      ? (<Loader />)
        :(
          <Box>

            {userId === review.userId && (
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
          </Box>
        )
      }

    </Box>
  );
};
