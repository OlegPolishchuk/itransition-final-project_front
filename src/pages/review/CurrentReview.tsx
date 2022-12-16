import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "hooks";
import {fetchReviews} from "store/actions";
import {selectIsReviewLoading, selectReviews} from "store/selectors";
import {Box} from "@mui/material";
import {Breadcrumbs, Loader, ReviewItem} from "common";

export const CurrentReview = () => {
  const dispatch = useAppDispatch();

  const {reviewId} = useParams();

  const review = useAppSelector(selectReviews)[0];
  const isLoading = useAppSelector(selectIsReviewLoading);

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
            <ReviewItem review={review} isHide={false}/>
          </Box>
        )
      }

    </Box>
  );
};
