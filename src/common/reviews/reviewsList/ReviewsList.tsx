import React, { FC, memo } from 'react';

import { Box, Button } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { Loader } from 'common/loaders';
import { NothingToShow } from 'common/nothingToShow/NothingToShow';
import { ReviewItem } from 'common/reviews/review';
import { Review } from 'store/types';

const LoadingReviewsBorderValue = 10;

type Props = {
  isLoading: boolean;
  isFirstLoading: boolean;
  reviews: Review[];
  totalCount: number;
  clickLoadMoreCallback: () => void;
};

export const ReviewsList: FC<Props> = memo(
  ({ clickLoadMoreCallback, reviews, isFirstLoading, totalCount, isLoading }: Props) => {
    return (
      <Box>
        {isLoading && isFirstLoading ? (
          <Loader />
        ) : (
          <>
            {reviews.map(review => (
              <ReviewItem key={review._id} review={review} isHide />
            ))}

            <Box textAlign="center">
              {isLoading && reviews.length >= LoadingReviewsBorderValue && (
                <Box textAlign="center">
                  <Loader />
                </Box>
              )}

              {totalCount > reviews.length ? (
                <Button
                  color="secondary"
                  variant="outlined"
                  onClick={clickLoadMoreCallback}
                >
                  <FormattedMessage id="app.page-main.button-show-more.title" />
                </Button>
              ) : (
                <NothingToShow
                  title={
                    reviews.length > 0 ? (
                      <FormattedMessage id="app.review.nothing-to-show.no-more.title" />
                    ) : (
                      <FormattedMessage id="app.review.nothing-to-show.no-reviews.title" />
                    )
                  }
                />
              )}
            </Box>
          </>
        )}
      </Box>
    );
  },
);
