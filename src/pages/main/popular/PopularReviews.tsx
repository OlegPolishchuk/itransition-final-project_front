import React, {useEffect} from 'react';
import {ReviewItem, Title} from "common";
import {Grid} from "@mui/material";
import {useAppDispatch, useAppSelector} from "hooks";
import {selectReviews} from "store/selectors";
import {fetchLatestReviews} from "store/actions/reviews/fetchLatestReviews";

export const PopularReviews = () => {
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
