import React, {FC} from 'react';
import {Loader} from "common/loaders";
import {ReviewItem} from "common/reviews/review";
import {Box, Button} from "@mui/material";
import {FormattedMessage} from "react-intl";
import {NothingToShow} from "common/nothingToShow/NothingToShow";
import {Review} from "store/types";


type Props = {
  isLoading: boolean;
  isFirstLoading: boolean;
  reviews: Review[];
  totalCount: number;
  clickLoadMoreCallback: () => void;
}


export const ReviewsList: FC<Props> = ({
                                         clickLoadMoreCallback,
                                         reviews,
                                         isFirstLoading,
                                         totalCount,
                                         isLoading
                                       }) => {
  return (
    <>
      {(isLoading && isFirstLoading)
        ? <Loader/>
        : (
          <>
            {reviews.map(review => (
              <ReviewItem
                key={review._id}
                review={review}
                isHide
              />
            ))}

            <Box textAlign={'center'}>

              {(isLoading && reviews.length >= 10) && (
                <Box textAlign={'center'}>
                  <Loader/>
                </Box>
              )}

              {totalCount > reviews.length
                ? (<Button
                  color={'secondary'}
                  variant={'outlined'}
                  onClick={clickLoadMoreCallback}
                >
                  <FormattedMessage id={'app.page-main.button-show-more.title'}/>
                </Button>)
                : (
                  <NothingToShow
                    title={
                      reviews.length > 0
                        ? <FormattedMessage
                          id={'app.review.nothing-to-show.no-more.title'}/>
                        : <FormattedMessage
                          id={'app.review.nothing-to-show.no-reviews.title'}/>
                    }
                  />
                )
              }
            </Box>
          </>
        )
      }
    </>
  );
};
