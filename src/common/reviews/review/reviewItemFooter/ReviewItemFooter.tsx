import React, {FC} from 'react';
import {Box, IconButton, Rating, Typography} from "@mui/material";
import {Tag} from "common/tags/tag/Tag";
import {useAppDispatch, useAppSelector, useThemeColors} from "hooks";
import {selectIsUserAuth, selectThemeMode, selectUser} from "store/selectors";
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import {addOverallScore, setReviewLike} from "store/actions";


type Props = {
  tags: string[];
  overallScore: number;
  comments: number;
  reviewId: string;
  likes: number,
  likesId: string[];
  overallScoresId: string[];
}

export const ReviewItemFooter: FC<Props> = ({
                                              tags,
                                              overallScore,
                                              comments,
                                              reviewId,
                                              likesId,
                                              likes,
                                              overallScoresId,
                                            }) => {
  const dispatch = useAppDispatch();

  const isUserAuth = useAppSelector(selectIsUserAuth);
  const user = useAppSelector(selectUser);

  const colors = useThemeColors();
  const theme = useAppSelector(selectThemeMode);

  const footerItemStyle = {display: 'flex', alignItems: 'center', gap: '10px'};
  const disabledLike = likesId.includes(user._id);
  const disabledScore = overallScoresId.includes(user._id);

  const handleClick = () => {

  }

  const handleChangePersonalScore = (newValue: number | null) => {
    dispatch(addOverallScore({reviewId, userId: user._id, score: newValue || 5}))
  }

  const handleSetLike = () => {
    dispatch(setReviewLike({reviewId, userId: user._id}))
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

        <Box sx={footerItemStyle}>
          {isUserAuth
            ? (
              <IconButton
                onClick={handleSetLike}
                disabled={disabledLike}
              >
                <FavoriteBorderOutlinedIcon/>
              </IconButton>)
            : <FavoriteBorderOutlinedIcon color={'disabled'}/>
          }

          <Typography component={'span'} color={colors.warning.main}>
            {likes ? likes : 0}
          </Typography>
        </Box>

        <Box sx={footerItemStyle}>
          {isUserAuth
            ? (
              <>
                <Rating
                  value={overallScore}
                  max={5}
                  precision={0.5}
                  disabled={disabledScore}
                  onChange={(event, newValue) => handleChangePersonalScore(newValue)}
                />
              </>
            )
            : (
              <>
                <GradeOutlinedIcon color={'disabled'}/>
                <Typography component={'span'} color={colors.warning.main}>
                  {overallScore}
                </Typography>
              </>

            )
          }

        </Box>

        <Box sx={footerItemStyle}>
          <CommentOutlinedIcon color={'disabled'}/>
          <Typography component={'span'} color={colors.warning.main}>
            {comments ? comments : 0}
          </Typography>
        </Box>

      </Box>
    </footer>
  );
};
