import React, {useEffect} from 'react';
import {useSearchParams} from "react-router-dom";
import {setReviewsPaginationParams} from "store/reducers";
import {fetchMoreReviews, fetchReviews} from "store/actions";
import {useAppDispatch, useAppSelector} from "hooks";
import {inputSearchParams} from "shared";
import {
  selectIsFirstLoading,
  selectIsReviewLoading,
  selectPaginationParams,
  selectReviewCount,
  selectReviews
} from "store/selectors";
import {Breadcrumbs, Title} from "common";
import {ReviewsList} from "common/reviews";
import {Box, Typography} from "@mui/material";
import {FormattedMessage} from "react-intl";

export const SearchReviews = () => {
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get(inputSearchParams.queryTitle);

  const reviews = useAppSelector(selectReviews);
  const isLoading = useAppSelector(selectIsReviewLoading);
  const {page} = useAppSelector(selectPaginationParams);
  const totalCount = useAppSelector(selectReviewCount);
  const isFirstLoading = useAppSelector(selectIsFirstLoading);


  const handleLoadMore = () => {
    const newPage = page + 1;
    let search = searchQuery ? searchQuery : '';

    dispatch(setReviewsPaginationParams({page: newPage}))
    dispatch(fetchMoreReviews({search, page: newPage}))
  }


  useEffect(() => {

    let search = searchQuery ? searchQuery : '';

    dispatch(setReviewsPaginationParams({page: 0}))
    dispatch(fetchReviews({search}))
  }, [searchQuery])

  return (
    <>

      <Breadcrumbs/>

      <Box display={'flex'} alignItems={'center'} gap={'10px'} mb={'30px'}>
        <Typography variant={'subtitle2'}>
          <FormattedMessage id='app.search-reviews.search-phrase.title'/>
        </Typography>

        <Typography variant={'h5'}>
          {searchQuery}
        </Typography>
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
