import React, { FC, useEffect } from 'react';

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { NavLink } from 'react-router-dom';

import { CardItemTitle } from 'common/index';
import { useThemeColors } from 'hooks';
import {
  addCheckboxIntoObjectList,
  paginationDefaultParams,
  parseDate,
  routes,
} from 'shared';
import { Review } from 'store/types';
import { CustomTheme } from 'theme';

type Props = {
  reviews: Review[];
  reviewsWithCheckbox: (Review & { checked: boolean })[];
  setReviewsWithCheckbox: (reviews: (Review & { checked: boolean })[]) => void;
  pageNumber: number;
};

export const ReviewList: FC<Props> = ({
  reviews,
  reviewsWithCheckbox,
  setReviewsWithCheckbox,
  pageNumber,
}) => {
  const themeColors = useThemeColors();
  const isLargeScreen = useMediaQuery('(min-width: 900px)');
  const listItemIndexRatio = pageNumber * paginationDefaultParams.limit;

  const handleChangeCurrentCheckbox = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string,
  ): void => {
    const { checked } = event.target;

    setReviewsWithCheckbox(
      reviewsWithCheckbox.map(review =>
        review._id === id ? { ...review, checked } : review,
      ),
    );
  };

  useEffect(() => {
    setReviewsWithCheckbox(addCheckboxIntoObjectList(reviews));
  }, [reviews]);

  return (
    <>
      {reviewsWithCheckbox.map((review, index) => (
        <Card key={`${review.title}${review.created}`}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            padding="0 0 0 16px"
          >
            <Box>
              <Typography
                color={themeColors.secondary.main}
                variant="h5"
                component="span"
              >
                {listItemIndexRatio + index + 1}.
              </Typography>

              <Typography variant="h5" component="span" sx={{ marginLeft: '15px' }}>
                {parseDate(review.created)}
              </Typography>
            </Box>

            <Checkbox
              checked={review.checked}
              onChange={e => {
                handleChangeCurrentCheckbox(e, review._id);
              }}
              color="secondary"
            />
          </Box>

          <CardContent sx={style.cardContentWrapper(isLargeScreen)}>
            <CardItemTitle title="title" description={review.title} />

            <CardItemTitle title="Subject Title" description={review.subtitle} />

            <CardItemTitle title="Tags" description={review.tags.join(',')} />

            <CardItemTitle
              title="Personal Score"
              description={review.personalScore}
              color={themeColors.warning.second}
            />

            <CardItemTitle
              title="Overall Score"
              description={review.overallScore}
              color={themeColors.warning.second}
            />
          </CardContent>

          <CardActions sx={style.cardActionsWrapper(themeColors)}>
            <Box textAlign="center">
              <Button variant="outlined" color="secondary">
                <NavLink className="navLink" to={`${routes.review.base}/${review._id}`}>
                  <FormattedMessage id="app.user.reviews.reviews-list.link-info.title" />
                </NavLink>
              </Button>
            </Box>
          </CardActions>
        </Card>
      ))}
    </>
  );
};

const style = {
  cardContentWrapper: (isLargeScreen: boolean) => ({
    display: 'flex',
    flexDirection: isLargeScreen ? 'row' : 'column',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  }),

  cardActionsWrapper: (themeColors: CustomTheme) => ({
    justifyContent: 'center',
    '& .navLink': {
      color: themeColors.secondary.main,
    },
  }),
};
