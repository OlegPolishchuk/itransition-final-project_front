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
import {FormattedMessage} from "react-intl";

export const CurrentReview = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const {reviewId} = useParams();

  const review = useAppSelector(selectReviews)[0];
  const isLoading = useAppSelector(selectIsReviewLoading);
  const user = useAppSelector(selectUser);
  const userRole = user.role;
  const userId = user._id;

  const handleEditReview = () => {
    dispatch(setEditableReview(review))

    navigate(routes.review.edit)
  }

  useEffect(() => {
    dispatch(fetchReviews({reviewId}))
    dispatch(createConnection(reviewId as string))

    return () => {
      dispatch(closeConnection())
    }
  }, [])


  return (
    <Box>

      <Breadcrumbs/>

      {isLoading
        ? (<Loader/>)
        : (
          <Box>
            {(userRole === 'admin' || userId === review.userId || userRole === 'manager') && (
              <Box sx={{textAlign: 'end', marginBottom: '30px'}}>
                <Button
                  color={'error'}
                  variant={'contained'}
                  onClick={handleEditReview}
                >
                  <FormattedMessage id='app.review.button-edit.title'/>
                </Button>
              </Box>
            )}

            <ReviewItem review={review} isHide={false}/>

            <Box mt={'50px'}>
              <Comments />
            </Box>
          </Box>
        )
      }

    </Box>
  );
};
