import React, { ReactElement, useEffect } from 'react';

import { Box, Button } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { useNavigate, useParams } from 'react-router-dom';

import { Breadcrumbs, Comments, Loader, ReviewItem } from 'common';
import { useAppDispatch, useAppSelector } from 'hooks';
import { routes } from 'shared';
import { closeConnection, createConnection, fetchReviews } from 'store/actions';
import { setEditableReview } from 'store/reducers/rewiewsReducer/reviewsSlice';
import { selectIsReviewLoading, selectReviews, selectUser } from 'store/selectors';

export const CurrentReview = (): ReactElement => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { reviewId } = useParams();

  const review = useAppSelector(selectReviews)[0];
  const isLoading = useAppSelector(selectIsReviewLoading);
  const user = useAppSelector(selectUser);
  const userRole = user.role;
  const userId = user._id;

  const handleEditReview = (): void => {
    dispatch(setEditableReview(review));

    navigate(routes.review.edit);
  };

  useEffect(() => {
    dispatch(fetchReviews({ reviewId }));
    dispatch(createConnection(reviewId as string));

    return () => {
      dispatch(closeConnection());
    };
  }, []);

  return (
    <Box>
      <Breadcrumbs />

      {isLoading ? (
        <Loader />
      ) : (
        <Box>
          {(userRole === 'admin' ||
            userId === review.userId ||
            userRole === 'manager') && (
            <Box sx={{ textAlign: 'end', marginBottom: '30px' }}>
              <Button color="error" variant="contained" onClick={handleEditReview}>
                <FormattedMessage id="app.review.button-edit.title" />
              </Button>
            </Box>
          )}

          <ReviewItem review={review} isHide={false} />

          <Box mt="50px">
            <Comments />
          </Box>
        </Box>
      )}
    </Box>
  );
};
