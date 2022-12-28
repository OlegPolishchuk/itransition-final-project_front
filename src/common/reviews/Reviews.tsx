import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "hooks";
import {fetchReviews} from "store/actions/reviews/fetchReviews";
import {
  selectIsFirstLoading,
  selectIsReviewLoading,
  selectPaginationParams, selectReviewCount,
  selectReviews
} from "store/selectors";
import {Loader, NothingToShow, ReviewItem} from "common/index";
import {useLocation, useSearchParams} from "react-router-dom";
import {Box, Button} from "@mui/material";
import {setReviewsPaginationParams} from "store/reducers";
import {fetchMoreReviews} from "store/actions";
import {FormattedMessage} from "react-intl";
import {ReviewSortType} from "store/types";
import {ReviewsList} from "common/reviews/reviewsList/ReviewsList";

export const Reviews = () => {
  const dispatch = useAppDispatch();

  const {pathname} = useLocation();


  const reviews = useAppSelector(selectReviews);
  const isLoading = useAppSelector(selectIsReviewLoading);
  const {page} = useAppSelector(selectPaginationParams);
  const totalCount = useAppSelector(selectReviewCount);
  const isFirstLoading = useAppSelector(selectIsFirstLoading);

  const handleLoadMore = () => {
    const newPage = page + 1;
    const sortType: ReviewSortType = pathname === '/' ? "created" : getPathname(pathname);

    dispatch(setReviewsPaginationParams({page: newPage}))
    dispatch(fetchMoreReviews({reviewsSortParams: sortType, page: newPage}))
  }

  const getPathname = (pathname: string) => {
    return pathname.split('/')[1] as ReviewSortType
  }

  useEffect(() => {
    const sortType: ReviewSortType = pathname === '/' ? "created" : getPathname(pathname);

    dispatch(setReviewsPaginationParams({page: 0}))
    dispatch(fetchReviews({ reviewsSortParams: sortType }))
  }, [pathname])


  return (
    <>
      <ReviewsList
        isLoading={isLoading}
        isFirstLoading={isFirstLoading}
        reviews={reviews}
        totalCount={totalCount}
        clickLoadMoreCallback={handleLoadMore}
        />
    </>
  );
};
