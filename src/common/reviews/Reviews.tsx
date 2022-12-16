import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "hooks";
import {fetchReviews} from "store/actions/reviews/fetchReviews";
import {selectIsReviewLoading, selectReviews} from "store/selectors";
import {Loader, ReviewItem} from "common/index";
import {useLocation} from "react-router-dom";
import {SortReviews} from "store/types";

export const Reviews = () => {
  const dispatch = useAppDispatch();

  const {pathname} = useLocation();

  const reviews = useAppSelector(selectReviews);
  const isLoading = useAppSelector(selectIsReviewLoading);

  useEffect(() => {
    const sortType: SortReviews = pathname === '/' ? "" : 'overallScore';

    dispatch(fetchReviews({sortReviews: sortType}))
  }, [pathname])

  return (
    <>
      {isLoading
        ? (<Loader/>)
        : (
          <>
            {reviews.map(review => (
              <ReviewItem
                key={review._id}
                review={review}
                isHide
              />
            ))}
          </>
        )
      }

    </>
  );
};
