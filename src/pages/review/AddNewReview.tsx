import React, {ChangeEvent, useEffect, useState} from 'react';
import {Box, Button, Container, Rating, TextField, useMediaQuery} from "@mui/material";
import MDEditor from '@uiw/react-md-editor';
import {Breadcrumbs, ImgUploader, TagsPicker, Title} from "common";
import {useAppDispatch, useAppSelector} from "hooks";
import {addReviewImage, createReview, getTags} from "store/actions";
import {useNavigate} from "react-router-dom";
import {FormattedMessage} from "react-intl";
import {
  selectSelectedUser,
  selectUploadedReviewImgSrc,
  selectUser
} from "store/selectors";

export const AddNewReview = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const user = useAppSelector(selectUser);
  const selectedUser = useAppSelector(selectSelectedUser);
  const uploadedImgSrc = useAppSelector(selectUploadedReviewImgSrc);

  const userRole = user.role;

  const userId = userRole === 'admin' ? selectedUser._id : user._id;

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

  const handleUploadFile = (file: File) => {
    const formData = new FormData();
    formData.append('file', file, `${userId}-${Date.now()}-${file.name}`)

    dispatch(addReviewImage(formData));
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
         label={<FormattedMessage id='app.user.add-new-review.field-title.title'/>}
         variant="outlined"
         value={reviewValue.title}
         onChange={handleChangeTitle}
         size={'small'}
         required
         error={error.title}
         helperText={error.title ? 'Required' : ''}
       />

       <TextField
         label={<FormattedMessage id='app.user.add-new-review.field-subtitle.title'/>}
         variant="outlined"
         value={reviewValue.subtitle}
         onChange={handleChangeSubtitle}
         size={'small'}
         required
         error={error.subtitle}
         helperText={error.subtitle ? 'Required' : ''}
       />
     </Box>

      <Box
        sx={{
          marginBottom: '30px',
          display: 'flex',
          flexDirection: isSmallScreen ? 'column' : 'row',
          alignItems: 'center',
          gap: '50px',
        }}
      >
        <ImgUploader onChangeFileCallback={handleUploadFile} />

        <Box sx={{
          overflowWrap: 'break-word'
        }}>
          {uploadedImgSrc}
        </Box>
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
          title={<FormattedMessage id='app.user.add-new-review.tags-picker.title'/>}
          color={error.tags ? 'error' : ''}
        />

        <TagsPicker
          handleChangeOptionCallback={handleChangeTags}
        />
      </Box>

      <Box mt={'30px'}>
        <Title
          variant={'subtitle2'}
          title={<FormattedMessage id='app.user.add-new-review.rating.title'/>}
        />

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
          <FormattedMessage id='app.user.add-new-review.button-publish.title'/>
        </Button>
      </Box>

    </Container>
  );
};
