import React, {FC, useEffect} from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Typography,
  useMediaQuery
} from "@mui/material";
import {CardItemTitle} from "common/cardItemTitle/CardItemTitle";
import {NavLink} from "react-router-dom";
import {Review} from "store/types/Review";
import {useThemeColors} from "hooks";
import {FormattedMessage} from "react-intl";
import {addCheckboxIntoObjectList, parseDate, routes} from "shared";

type Props = {
  reviews: Review[];
  reviewsWithCheckbox: (Review & { checked: boolean })[];
  setReviewsWithCheckbox: (reviews: (Review & { checked: boolean })[]) => void;
}

export const ReviewList: FC<Props> = ({
                                        reviews,
                                        reviewsWithCheckbox,
                                        setReviewsWithCheckbox
                                      }) => {
  const themeColors = useThemeColors();
  const largeScreen = useMediaQuery('(min-width: 900px)');


  const handleChangeCurrentCheckbox = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const checked = event.target.checked;

    setReviewsWithCheckbox(reviewsWithCheckbox.map(reviw => (
      reviw._id === id ? {...reviw, checked,} : reviw
    )))
  }


  useEffect(() => {
    setReviewsWithCheckbox(addCheckboxIntoObjectList(reviews))
  }, [reviews])


  return (
    <>
      {reviewsWithCheckbox.map((review, index) => (
        <Card key={review.title + '' + review.created}>
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            padding={'0 0 0 16px'}
          >

            <Box>
              <Typography
                color={themeColors.secondary.main}
                variant={'h5'}
                component={'span'}
              >
                {index + 1}.
              </Typography>

              <Typography
                variant={'h5'}
                component={'span'}
                sx={{marginLeft: '15px'}}
              >
                {parseDate(review.created)}
              </Typography>
            </Box>

            <Checkbox
              checked={review.checked}
              onChange={(e) => {
                handleChangeCurrentCheckbox(e, review._id)
              }}
              color="secondary"
            />

          </Box>

          <CardContent sx={{
            display: 'flex',
            flexDirection: largeScreen ? 'row' : 'column',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}>

            <CardItemTitle
              title={'title'}
              description={review.title}
            />

            <CardItemTitle
              title={'Subject Title'}
              description={review.subtitle}
            />

            <CardItemTitle
              title={'Personal Score'}
              description={review.personalScore}
              color={themeColors.warning.second}
            />

            <CardItemTitle
              title={'Overall Score'}
              description={review.overallScore}
              color={themeColors.warning.second}
            />

          </CardContent>

          <CardActions sx={{
            justifyContent: 'center',
            '& .navLink': {
              color: themeColors.secondary.main,
            }
          }}>

            <Box textAlign={'center'}>
              <Button variant={'outlined'} color={'secondary'}>
                <NavLink className='navLink' to={`${routes.admin.review}/${review._id}`}>
                  <FormattedMessage id='app.user.reviews.reviews-list.link-info.title'/>
                </NavLink>
              </Button>
            </Box>

          </CardActions>

        </Card>
      ))}
    </>
  );
};
