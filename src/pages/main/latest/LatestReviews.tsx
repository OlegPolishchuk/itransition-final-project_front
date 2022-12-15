import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "hooks";
import {fetchLatestReviews} from "store/actions/reviews/fetchLatestReviews";
import {selectReviews} from "store/selectors";
import {Grid} from "@mui/material";
import {ReviewItem, Title} from "common";

export const LatestReviews = () => {
  const dispatch = useAppDispatch();

  const reviews = useAppSelector(selectReviews);


  useEffect(() => {
    dispatch(fetchLatestReviews())
  }, [])

  return (
    <>

      <Title variant={'h3'} title={'Latest reviews:'} />

      <Grid container>

        <Grid item xs={12} lg={9}>

          {reviews.map(review => (
            <ReviewItem key={review._id} review={review} />
          ))}

        </Grid>

      </Grid>

    </>
  );
};
