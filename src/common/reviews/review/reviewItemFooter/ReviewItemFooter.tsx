import React, { FC } from 'react';

import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';
import { Box, IconButton, Rating, Tooltip, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { Tag } from 'common/tags/tag/Tag';
import { useAppDispatch, useAppSelector, useThemeColors } from 'hooks';
import { addOverallScore, setReviewLike } from 'store/actions';
import { selectIsUserAuth, selectThemeMode } from 'store/selectors';

const MaxOverallScore = 5;

type Props = {
  tags: string[];
  overallScore: number;
  comments: number;
  reviewId: string;
  likes: number;
  likesId: string[];
  overallScoresId: string[];
  userId: string;
};

export const ReviewItemFooter: FC<Props> = ({
  tags,
  overallScore,
  comments,
  reviewId,
  likesId,
  likes,
  overallScoresId,
  userId,
}) => {
  const dispatch = useAppDispatch();

  const isUserAuth = useAppSelector(selectIsUserAuth);

  const colors = useThemeColors();
  const theme = useAppSelector(selectThemeMode);

  const footerItemStyle = { display: 'flex', alignItems: 'center', gap: '10px' };
  const disabledScore = overallScoresId.includes(userId);

  const handleClick = (): void => {};

  const handleChangeOverallScore = (newValue: number | null): void => {
    dispatch(addOverallScore({ reviewId, userId, score: newValue || MaxOverallScore }));
  };

  const disabledLike = likesId.includes(userId);

  const handleSetLike = (): void => {
    if (likesId.includes(userId)) return;

    dispatch(setReviewLike({ reviewId, userId }));
  };

  return (
    <footer>
      <Box mb="15px" px="10px">
        {tags.map(tag => (
          <Tag key={tag} title={tag} size="small" clickCallback={handleClick} />
        ))}
      </Box>

      <Box
        sx={{
          backgroundColor: theme === 'dark' ? '#464242' : '#f6f6f6',
          padding: '10px',
          display: 'flex',
          alignItems: 'center',
          gap: '30px',
        }}
      >
        <Tooltip title={<FormattedMessage id="app.review-footer.like.tooltip.title" />}>
          <Box sx={footerItemStyle}>
            {isUserAuth ? (
              <IconButton
                onClick={handleSetLike}
                disabled={disabledLike}
                sx={{ padding: 0 }}
              >
                <FavoriteBorderOutlinedIcon />
              </IconButton>
            ) : (
              <FavoriteBorderOutlinedIcon color="disabled" />
            )}

            <Typography component="span" color={colors.warning.main}>
              {likes || 0}
            </Typography>
          </Box>
        </Tooltip>

        <Box sx={footerItemStyle}>
          {isUserAuth ? (
            <Tooltip
              title={
                <FormattedMessage id="app.review-footer.overall-score.tooltip.title" />
              }
            >
              <Rating
                value={overallScore}
                max={5}
                precision={0.5}
                disabled={disabledScore}
                onChange={(event, newValue) => handleChangeOverallScore(newValue)}
              />
            </Tooltip>
          ) : (
            <Tooltip
              title={
                <FormattedMessage id="app.review-footer.overall-score.tooltip.title" />
              }
            >
              <>
                <GradeOutlinedIcon color="disabled" />
                <Typography component="span" color={colors.warning.main}>
                  {overallScore}
                </Typography>
              </>
            </Tooltip>
          )}
        </Box>

        <Tooltip title={<FormattedMessage id="app.review.footer.comments.title" />}>
          <Box sx={footerItemStyle}>
            <CommentOutlinedIcon color="disabled" />
            <Typography component="span" color={colors.warning.main}>
              {comments || 0}
            </Typography>
          </Box>
        </Tooltip>
      </Box>
    </footer>
  );
};
