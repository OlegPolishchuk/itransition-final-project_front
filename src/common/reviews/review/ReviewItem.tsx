import React, {FC} from 'react';
import {Box} from "@mui/material";
import {Review} from "store/types";
import {ReviewItemHeader} from "common/reviews/review/reviewItemHeader/ReviewItemHeader";
import {ReviewItemBody} from "common/reviews/review/reviewItemBody/ReviewItemBody";
import {ReviewItemFooter} from "common/reviews/review/reviewItemFooter/ReviewItemFooter";
import {useAppSelector, useThemeColors} from "hooks";
import {selectThemeMode} from "store/selectors";

type Props = {
  review: Review;
}

export const ReviewItem: FC<Props> = ({review}) => {
  const theme = useAppSelector(selectThemeMode);
  const colors = useThemeColors();

  return (
    <Box sx={{
      margin: '50px 0',
      backgroundColor: theme === 'dark' ?  colors.primary.main : '#fff',
      borderRadius: '4px',
      backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))',
      '& > div': {padding: '15px'},
    }}>

      <ReviewItemHeader
        userName={review.userName}
        userAvatar={review.userAvatar}
        created={review.created}
      />

      <ReviewItemBody
        title={review.title}
        subtitle={review.subtitle}
        body={review.body}
        overallScore={review.overallScore}
      />

      <ReviewItemFooter tags={review.tags} />

    </Box>
  );
};
