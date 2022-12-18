import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "hooks";
import {fetchReviews} from "store/actions/reviews/fetchReviews";
import {
  selectIsReviewLoading,
  selectPaginationParams, selectReviewCount,
  selectReviews
} from "store/selectors";
import {Loader, NothingToShow, ReviewItem} from "common/index";
import {useLocation} from "react-router-dom";
import {SortReviews} from "store/types";
import {Box, Button} from "@mui/material";
import {setReviewsPaginationParams} from "store/reducers";
import {fetchMoreReviews} from "store/actions";

export const Reviews = () => {
  const dispatch = useAppDispatch();

  const {pathname} = useLocation();

  const reviews = useAppSelector(selectReviews);
  const isLoading = useAppSelector(selectIsReviewLoading);
  const {page} = useAppSelector(selectPaginationParams);
  const totalCount = useAppSelector(selectReviewCount);

  const handleLoadMore = () => {
    const newPage = page + 1;
    const sortType: SortReviews = pathname === '/' ? "" : 'overallScore';

    dispatch(setReviewsPaginationParams({page: newPage}))
    dispatch(fetchMoreReviews({sortReviews: sortType, page: newPage}))
  }

  useEffect(() => {
    const sortType: SortReviews = pathname === '/' ? "" : 'overallScore';

    dispatch(setReviewsPaginationParams({page: 0}))
    dispatch(fetchReviews({sortReviews: sortType}))
  }, [pathname])


  return (
    <>

      {isLoading && <Loader/>}

      {reviews.map(review => (
        <ReviewItem
          key={review._id}
          review={review}
          isHide
        />
      ))}

      <Box textAlign={'center'}>

        {(isLoading && reviews.length > 10) && (
          <Box textAlign={'center'}>
            <Loader/>
          </Box>
        )}

        {totalCount > reviews.length
          ? (<Button
            color={'secondary'}
            variant={'outlined'}
            onClick={handleLoadMore}
          >
            Load more
          </Button>)
          : (<NothingToShow title={'no more'}/>)
        }
      </Box>

    </>
  );
};
