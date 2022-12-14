import React, { FC } from 'react';

import { Box } from '@mui/material';

import { ReviewItemBody } from 'common/reviews/review/reviewItemBody/ReviewItemBody';
import { ReviewItemFooter } from 'common/reviews/review/reviewItemFooter/ReviewItemFooter';
import { ReviewItemHeader } from 'common/reviews/review/reviewItemHeader/ReviewItemHeader';
import { useAppSelector, useThemeColors } from 'hooks';
import { selectThemeMode } from 'store/selectors';
import { Review } from 'store/types';

type Props = {
  review: Review;
  isHide: boolean;
};

export const ReviewItem: FC<Props> = ({ review, isHide }) => {
  const theme = useAppSelector(selectThemeMode);
  const colors = useThemeColors();

  return (
    <Box
      sx={{
        marginBottom: '50px',
        backgroundColor: theme === 'dark' ? colors.primary.main : '#fff',
        borderRadius: '4px',
        backgroundImage:
          'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))',
        '& > div': { padding: '15px' },
      }}
    >
      <ReviewItemHeader
        userName={review.userName}
        userAvatar={review.userAvatar}
        created={review.created}
        userId={review.userId}
        userLikes={review.userLikes}
        subtitle={review.subtitle}
        personalScore={review.personalScore}
        group={review.group}
      />

      <ReviewItemBody
        title={review.title}
        body={review.body}
        reviewId={review._id}
        isHide={isHide}
      />

      <ReviewItemFooter
        tags={review.tags}
        overallScore={review.overallScore}
        comments={review.comments}
        reviewId={review._id}
        overallScoresId={review.overallScoresId}
        likesId={review.likesId}
        likes={review.likes}
        userId={review.userId}
      />
    </Box>
  );
};
