import React, { ReactElement, useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import { ReviewsList } from 'common/reviews/reviewsList/ReviewsList';
import { useAppDispatch, useAppSelector } from 'hooks';
import { getPathname } from 'shared';
import { fetchMoreReviews } from 'store/actions';
import { fetchReviews } from 'store/actions/reviews/fetchReviews';
import { setReviewsPaginationParams } from 'store/reducers';
import {
  selectIsFirstLoading,
  selectIsReviewLoading,
  selectPaginationParams,
  selectReviewCount,
  selectReviews,
} from 'store/selectors';
import { ReviewSortType } from 'store/types';

export const Reviews = (): ReactElement => {
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();

  const reviews = useAppSelector(selectReviews);
  const isLoading = useAppSelector(selectIsReviewLoading);
  const { page, limit } = useAppSelector(selectPaginationParams);
  const totalCount = useAppSelector(selectReviewCount);
  const isFirstLoading = useAppSelector(selectIsFirstLoading);

  const handleLoadMore = (): void => {
    const newPage = page + 1;
    const sortType: ReviewSortType = pathname === '/' ? 'created' : getPathname(pathname);

    dispatch(setReviewsPaginationParams({ page: newPage, limit }));
    dispatch(fetchMoreReviews({ reviewsSortParams: sortType, page: newPage }));
  };

  useEffect(() => {
    const sortType: ReviewSortType = pathname === '/' ? 'created' : getPathname(pathname);

    dispatch(setReviewsPaginationParams({ page: 0, limit }));
    dispatch(fetchReviews({ reviewsSortParams: sortType }));
  }, [pathname]);

  return (
    <ReviewsList
      isLoading={isLoading}
      isFirstLoading={isFirstLoading}
      reviews={reviews}
      totalCount={totalCount}
      clickLoadMoreCallback={handleLoadMore}
    />
  );
};
