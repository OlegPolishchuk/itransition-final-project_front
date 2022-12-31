import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react';

import {
  Box,
  Button,
  Container,
  Rating,
  SelectChangeEvent,
  TextField,
  useMediaQuery,
} from '@mui/material';
import MDEditor from '@uiw/react-md-editor';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import { Breadcrumbs, ImgUploader, ItemPicker, TagsPicker, Title } from 'common';
import { useAppDispatch, useAppSelector } from 'hooks';
import { groups } from 'shared/constants';
import { addReviewImage, createReview, getTags, updateReview } from 'store/actions';
import {
  setEditableReview,
  setIsCreatedNewReview,
} from 'store/reducers/rewiewsReducer/reviewsSlice';
import {
  selectEditableReview,
  selectIsCreatedNewReview,
  selectSelectedUser,
  selectUploadedReviewImgSrc,
  selectUser,
} from 'store/selectors';

export const AddNewReview = (): ReactElement => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const user = useAppSelector(selectUser);
  const selectedUser = useAppSelector(selectSelectedUser);
  const uploadedImgSrc = useAppSelector(selectUploadedReviewImgSrc);
  const isCreatedNewReview = useAppSelector(selectIsCreatedNewReview);
  const editableReview = useAppSelector(selectEditableReview);

  const userRole = user.role;

  const userId = userRole === 'admin' ? selectedUser._id : user._id;

  const isSmallScreen = useMediaQuery('(max-width: 900px)');

  const [reviewValue, setReviewValue] = useState({
    title: editableReview ? editableReview.title : '',
    subtitle: editableReview ? editableReview.subtitle : '',
    body: editableReview ? editableReview.body : '',
    group: editableReview ? editableReview.group : groups[0],
    tags: editableReview ? editableReview.tags : ([] as string[]),
    personalScore: editableReview ? editableReview.personalScore : 0,
    overallScore: editableReview ? editableReview.overallScore : 0,
  });

  const [error, setError] = useState({
    title: false,
    subtitle: false,
    tags: false,
  });

  const handleChangeTitle = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    setReviewValue(reviewValue => ({ ...reviewValue, title: event.target.value }));

    setError(error => ({ ...error, title: false }));
  };

  const handleChangeSubtitle = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    setReviewValue(reviewValue => ({ ...reviewValue, subtitle: event.target.value }));

    setError(error => ({ ...error, subtitle: false }));
  };

  const handleChangeBody = (value?: string): void => {
    if (value) {
      setReviewValue(reviewValue => ({ ...reviewValue, body: value }));
    }
  };

  const handleChangeTags = (tags: string[]): void => {
    setReviewValue(reviewValue => ({ ...reviewValue, tags }));

    setError(error => ({ ...error, tags: false }));
  };

  const handleChangePersonalScore = (newValue: number | null): void => {
    setReviewValue(reviewValue => ({
      ...reviewValue,
      personalScore: newValue as number,
    }));
  };

  const handleChangeGroup = (event: SelectChangeEvent): void => {
    const { value } = event.target;

    setReviewValue(reviewValue => ({ ...reviewValue, group: value }));
  };

  const handlePublishReview = (): any => {
    if (!handleCheckErrors()) {
      if (editableReview) {
        const updatedReview = { ...editableReview, ...reviewValue };

        return dispatch(updateReview(updatedReview));
      }

      return dispatch(createReview(reviewValue));
    }
  };

  const handleCheckErrors = (): boolean => {
    const errors = {
      title: reviewValue.title === '',
      subtitle: reviewValue.subtitle === '',
      tags: reviewValue.tags.length === 0,
    };

    setError(errors);

    const values = Object.values(errors);

    return values.some(value => value);
  };

  const handleUploadFile = (file: File): void => {
    const formData = new FormData();

    formData.append('file', file, `${userId}-${Date.now()}-${file.name}`);

    dispatch(addReviewImage(formData));
  };

  useEffect(() => {
    dispatch(getTags());

    return () => {
      dispatch(setIsCreatedNewReview(false));
      dispatch(setEditableReview(null));
    };
  }, []);

  useEffect(() => {
    if (isCreatedNewReview) {
      navigate(-1);
    }
  }, [isCreatedNewReview]);

  return (
    <Container sx={{ paddingBottom: '50px' }}>
      <Breadcrumbs />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          marginBottom: '30px',
        }}
      >
        <ItemPicker
          valueList={groups}
          changeValueCallback={handleChangeGroup}
          value={reviewValue.group}
        />

        <TextField
          label={<FormattedMessage id="app.user.add-new-review.field-title.title" />}
          variant="outlined"
          value={reviewValue.title}
          onChange={handleChangeTitle}
          size="small"
          required
          error={error.title}
          helperText={error.title ? 'Required' : ''}
        />

        <TextField
          label={<FormattedMessage id="app.user.add-new-review.field-subtitle.title" />}
          variant="outlined"
          value={reviewValue.subtitle}
          onChange={handleChangeSubtitle}
          size="small"
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

        <Box
          sx={{
            overflowWrap: 'break-word',
          }}
        >
          {uploadedImgSrc}
        </Box>
      </Box>

      <MDEditor
        value={reviewValue.body}
        onChange={handleChangeBody}
        preview={isSmallScreen ? 'edit' : 'live'}
        style={{ minHeight: '400px' }}
      />

      <Box mt="30px">
        <Title
          variant="subtitle2"
          title={<FormattedMessage id="app.user.add-new-review.tags-picker.title" />}
          color={error.tags ? 'error' : ''}
        />

        <TagsPicker handleChangeOptionCallback={handleChangeTags} />
      </Box>

      <Box mt="30px">
        <Title
          variant="subtitle2"
          title={<FormattedMessage id="app.user.add-new-review.rating.title" />}
        />

        <Rating
          value={reviewValue.personalScore}
          max={10}
          onChange={(event, newValue) => handleChangePersonalScore(newValue)}
        />
      </Box>

      <Box textAlign="center" mt="50px">
        <Button variant="contained" color="error" onClick={handlePublishReview}>
          {editableReview ? (
            <FormattedMessage id="app.user.add-new-review.button-edit.title" />
          ) : (
            <FormattedMessage id="app.user.add-new-review.button-publish.title" />
          )}
        </Button>
      </Box>
    </Container>
  );
};
