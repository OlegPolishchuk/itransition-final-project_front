import React, { memo, ReactElement, useCallback, useEffect } from 'react';

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
  selectPaginationParamsLimit,
  selectReviewCount,
  selectReviews,
} from 'store/selectors';
import { selectPaginationParamsPage } from 'store/selectors/reviews';
import { ReviewSortType } from 'store/types';

export const Reviews = memo((): ReactElement => {
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();

  const reviews = useAppSelector(selectReviews);
  const isLoading = useAppSelector(selectIsReviewLoading);
  const page = useAppSelector(selectPaginationParamsPage);
  const limit = useAppSelector(selectPaginationParamsLimit);
  const totalCount = useAppSelector(selectReviewCount);
  const isFirstLoading = useAppSelector(selectIsFirstLoading);

  const handleLoadMore = useCallback((): void => {
    const newPage = page + 1;
    const sortType: ReviewSortType = pathname === '/' ? 'created' : getPathname(pathname);

    dispatch(setReviewsPaginationParams({ page: newPage, limit }));
    dispatch(fetchMoreReviews({ reviewsSortParams: sortType, page: newPage }));
  }, [page, pathname, limit]);

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
});
