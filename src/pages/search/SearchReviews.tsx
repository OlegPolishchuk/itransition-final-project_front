import React, { ReactElement, useEffect } from 'react';

import { Box, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { useSearchParams } from 'react-router-dom';

import { Breadcrumbs } from 'common';
import { ReviewsList } from 'common/reviews';
import { useAppDispatch, useAppSelector } from 'hooks';
import { inputSearchParams, paginationDefaultParams } from 'shared';
import { fetchMoreReviews, fetchReviews } from 'store/actions';
import { setReviewsPaginationParams } from 'store/reducers';
import {
  selectIsFirstLoading,
  selectIsReviewLoading,
  selectPaginationParams,
  selectReviewCount,
  selectReviews,
} from 'store/selectors';

export const SearchReviews = (): ReactElement => {
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get(inputSearchParams.queryTitle);

  const reviews = useAppSelector(selectReviews);
  const isLoading = useAppSelector(selectIsReviewLoading);
  const { page } = useAppSelector(selectPaginationParams);
  const totalCount = useAppSelector(selectReviewCount);
  const isFirstLoading = useAppSelector(selectIsFirstLoading);

  const { limit } = paginationDefaultParams;

  const handleLoadMore = (): void => {
    const newPage = page + 1;
    const search = searchQuery || '';

    dispatch(setReviewsPaginationParams({ page: newPage, limit }));
    dispatch(fetchMoreReviews({ search, page: newPage }));
  };

  useEffect(() => {
    const search = searchQuery || '';

    dispatch(setReviewsPaginationParams({ page: 0, limit }));
    dispatch(fetchReviews({ search }));
  }, [searchQuery]);

  return (
    <>
      <Breadcrumbs />

      <Box display="flex" alignItems="center" gap="10px" mb="30px">
        <Typography variant="subtitle2">
          <FormattedMessage id="app.search-reviews.search-phrase.title" />
        </Typography>

        <Typography variant="h5">{searchQuery}</Typography>
      </Box>

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
