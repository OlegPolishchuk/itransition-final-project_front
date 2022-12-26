import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "hooks";
import {fetchReviews} from "store/actions";
import {selectIsReviewLoading, selectReviews, selectUser} from "store/selectors";
import {Box, Button} from "@mui/material";
import {Breadcrumbs, Loader, ReviewItem} from "common";
import {routes} from "shared";
import {setEditableReview} from "store/reducers/rewiewsReducer/reviewsSlice";

export const CurrentReview = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const {reviewId} = useParams();

  const review = useAppSelector(selectReviews)[0];
  const isLoading = useAppSelector(selectIsReviewLoading);
  const user = useAppSelector(selectUser);

  const userRole = user.role;
  const userId = user._id


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
          </Box>
        )
      }

    </Box>
  );
};
