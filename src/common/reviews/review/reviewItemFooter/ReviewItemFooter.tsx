import React, {FC} from 'react';
import {Box, IconButton, Rating, Tooltip, Typography} from "@mui/material";
import {Tag} from "common/tags/tag/Tag";
import {useAppDispatch, useAppSelector, useThemeColors} from "hooks";
import {
  selectAdminCurrentUser,
  selectIsUserAuth,
  selectSelectedUser,
  selectThemeMode,
  selectUser
} from "store/selectors";
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import {addOverallScore, setReviewLike} from "store/actions";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import {FormattedMessage} from "react-intl";


type Props = {
  tags: string[];
  overallScore: number;
  comments: number;
  reviewId: string;
  likes: number;
  likesId: string[];
  overallScoresId: string[];
  userId: string;
}

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

  const footerItemStyle = {display: 'flex', alignItems: 'center', gap: '10px'};
  const disabledScore = overallScoresId.includes(userId);

  const handleClick = () => {

  }

  const handleChangePersonalScore = (newValue: number | null) => {
    dispatch(addOverallScore({reviewId, userId, score: newValue || 5}))
  }

  const disabledLike = likesId.includes(userId);

  const handleSetLike = () => {
    if (likesId.includes(userId)) return;

    dispatch(setReviewLike({reviewId, userId}))
  }


  return (
    <footer>
      <Box mb={'15px'} px={'10px'}>
        {tags.map(tag => (
          <Tag
            key={tag}
            title={tag}
            size={'small'}
            clickCallback={handleClick}
          />
        ))}
      </Box>

      <Box
        sx={{
          backgroundColor: theme === 'dark' ? '#464242' : '#f6f6f6',
          padding: '10px',
          display: 'flex',
          alignItems: 'center',
          gap: '30px'
        }}
      >

        <Tooltip title={<FormattedMessage id='app.review-footer.like.tooltip.title'/>} >
          <Box sx={footerItemStyle}>
            {isUserAuth
              ? (<IconButton
                onClick={handleSetLike}
                disabled={disabledLike}
                sx={{padding: 0}}
              >
                <FavoriteBorderOutlinedIcon/>
              </IconButton>)
              : <FavoriteBorderOutlinedIcon color={'disabled'}/>
            }

            <Typography component={'span'} color={colors.warning.main}>
              {likes ? likes : 0}
            </Typography>
          </Box>
        </Tooltip>

        <Box sx={footerItemStyle}>
          {isUserAuth
            ? (
              <>
                <Tooltip
                  title={<FormattedMessage id='app.review-footer.overall-score.tooltip.title'/>}
                >
                  <Rating
                    value={overallScore}
                    max={5}
                    precision={0.5}
                    disabled={disabledScore}
                    onChange={(event, newValue) => handleChangePersonalScore(newValue)}
                  />
                </Tooltip>
              </>
            )
            : (
              <>
                <Tooltip
                  title={<FormattedMessage id='app.review-footer.overall-score.tooltip.title'/>}
                >
                  <>
                    <GradeOutlinedIcon color={'disabled'}/>
                    <Typography component={'span'} color={colors.warning.main}>
                      {overallScore}
                    </Typography>
                  </>
                </Tooltip>
              </>

            )
          }

        </Box>

        <Tooltip title={<FormattedMessage id='app.review.footer.comments.title'/>}>
          <Box sx={footerItemStyle}>
            <CommentOutlinedIcon color={'disabled'}/>
            <Typography component={'span'} color={colors.warning.main}>
              {comments ? comments : 0}
            </Typography>
          </Box>
        </Tooltip>

      </Box>
    </footer>
  );
};
