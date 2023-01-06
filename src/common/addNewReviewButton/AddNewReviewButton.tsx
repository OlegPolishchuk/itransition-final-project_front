import React, { memo, ReactElement } from 'react';

import { Button } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import { routes } from 'shared';

export const AddNewReviewButton = memo((): ReactElement => {
  const navigate = useNavigate();

  console.log('addNewReviewButton rendered');
  const handleClick = (): void => {
    navigate(routes.review.addNew);
  };

  return (
    <Button variant="contained" color="error" onClick={handleClick}>
      <FormattedMessage id="app.user.reviews.add-new-review.button.title" />
    </Button>
  );
});
