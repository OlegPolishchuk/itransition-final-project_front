import React, {ChangeEvent, useEffect, useState} from 'react';
import {Box, Button, Container, Rating, TextField, useMediaQuery} from "@mui/material";
import MDEditor from '@uiw/react-md-editor';
import {Breadcrumbs, TagsPicker, Title} from "common";
import {useAppDispatch} from "hooks";
import {createReview, getTags} from "store/actions";
import {useNavigate} from "react-router-dom";

export const AddNewReview = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const isSmallScreen = useMediaQuery('(max-width: 900px)');


  const [reviewValue, setReviewValue] = useState({
    title: '',
    subtitle: '',
    body: '',
    tags: [] as string[],
    personalScore: 0,
    overallScore: 0,
  });

  const [error, setError] = useState({
    title: false,
    subtitle: false,
    tags: false
  })


  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
     setReviewValue(reviewValue => ({...reviewValue, title: event.target.value}));

     setError(error => ({...error, title: false}))
  }

  const handleChangeSubtitle = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setReviewValue(reviewValue => ({...reviewValue, subtitle: event.target.value}));

    setError(error => ({...error, subtitle: false}))
  }

  const handleChangeBody = (value?: string) => {
    value && setReviewValue(reviewValue => ({...reviewValue, body: value}));
  }

  const handleChangeTags = (tags: string[]) => {
    setReviewValue(reviewValue => ({...reviewValue, tags: tags}))

    setError(error => ({...error, tags: false}))
  }

  const handleChangePersonalScore = (newValue: number | null) => {
    setReviewValue(reviewValue => ({...reviewValue, personalScore: newValue as number}))
  }

  const handlePublishReview = () => {

    if (!handleCheckErrors()) {
      dispatch(createReview(reviewValue))

      navigate(-1)
    }
  }

  const handleCheckErrors = () => {
    const errors = {
      title: reviewValue.title === '',
      subtitle: reviewValue.subtitle === '',
      tags: reviewValue.tags.length === 0,
    }

    setError(errors);

    const values = Object.values(errors);

    return values.some(value => value)
  }


  useEffect(() => {
    dispatch(getTags());
  }, [])



  return (
    <Container sx={{paddingBottom: '50px'}}>
      <Breadcrumbs />

     <Box
       sx={{
       display: 'flex',
       flexDirection: 'column',
       gap: '15px',
       marginBottom: '30px',
     }}>
       <TextField
         label="Title"
         variant="outlined"
         value={reviewValue.title}
         onChange={handleChangeTitle}
         size={'small'}
         required
         error={error.title}
         helperText={error.title ? 'Required' : ''}
       />

       <TextField
         label="Subtitle"
         variant="outlined"
         value={reviewValue.subtitle}
         onChange={handleChangeSubtitle}
         size={'small'}
         required
         error={error.subtitle}
         helperText={error.subtitle ? 'Required' : ''}
       />
     </Box>


      <MDEditor
        value={reviewValue.body}
        onChange={handleChangeBody}
        preview={isSmallScreen ? 'edit' : 'live'}
        style={{minHeight: '400px'}}
      />

      <Box mt={'30px'}>
        <Title
          variant={"subtitle2"}
          title={'Choose one or several tags'}
          color={error.tags ? 'error' : ''}
        />

        <TagsPicker
          handleChangeOptionCallback={handleChangeTags}
        />
      </Box>

      <Box mt={'30px'}>
        <Title variant={'subtitle2'} title={'Give your score'} />

        <Rating
          value={reviewValue.personalScore}
          max={10}
          onChange={(event, newValue) => handleChangePersonalScore(newValue)}
        />
      </Box>

      <Box textAlign={'center'} mt={'50px'}>
        <Button
          variant={'contained'}
          color={'error'}
          onClick={handlePublishReview}
        >
          PUBLISH
        </Button>
      </Box>

      <MDEditor.Markdown source={reviewValue.body} style={{ whiteSpace: 'pre-wrap' }} />
    </Container>
  );
};
