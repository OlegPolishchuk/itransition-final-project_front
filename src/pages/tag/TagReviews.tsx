import React, { ReactElement, useEffect } from 'react';

import { Autocomplete, Box, TextField } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

import { Breadcrumbs, Title } from 'common';
import { ReviewsList } from 'common/reviews';
import { useAppDispatch, useAppSelector } from 'hooks';
import { paginationDefaultParams } from 'shared';
import { fetchMoreReviews, fetchReviews } from 'store/actions';
import { setReviewsPaginationParams } from 'store/reducers';
import {
  selectIsFirstLoading,
  selectIsReviewLoading,
  selectPaginationParams,
  selectReviewCount,
  selectReviews,
  selectTags,
} from 'store/selectors';

export const TagReviews = (): ReactElement => {
  const dispatch = useAppDispatch();

  const [params, setParams] = useSearchParams();

  const allTags = useAppSelector(selectTags);
  const reviews = useAppSelector(selectReviews);
  const isLoading = useAppSelector(selectIsReviewLoading);
  const { page } = useAppSelector(selectPaginationParams);
  const totalCount = useAppSelector(selectReviewCount);
  const isFirstLoading = useAppSelector(selectIsFirstLoading);

  const { limit } = paginationDefaultParams;

  const tagsParams = params.get('tag') as string;
  const tags = tagsParams.split(',');

  const handleLoadMore = (): void => {
    const newPage = page + 1;

    dispatch(setReviewsPaginationParams({ page: newPage, limit }));
    dispatch(fetchMoreReviews({ tags, page: newPage }));
  };

  const handleAddTag = (value: string[]): void => {
    params.set('tag', value.join(','));

    setParams(params);
  };

  useEffect(() => {
    dispatch(setReviewsPaginationParams({ page: 0, limit }));
    dispatch(fetchReviews({ tags }));
  }, [tagsParams]);

  return (
    <>
      <Breadcrumbs />

      <Box my={2}>
        <Title variant="subtitle1" title="Tags:" />

        <Autocomplete
          multiple
          disablePortal
          clearOnEscape
          id="combo-box-demo"
          options={allTags}
          value={tags}
          size="small"
          onChange={(event, value) => handleAddTag(value)}
          renderInput={params => <TextField {...params} />}
        />
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
