import React from 'react';
import {BaseNavLink} from "common/baseNavLink/BaseNavLink";
import {routes} from "shared";
import {FormattedMessage} from "react-intl";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

export const AddNewReviewButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(routes.review.addNew)
  }

  return (
    <Button
      variant={'contained'}
      color={'error'}
      onClick={handleClick}
    >
      <FormattedMessage id='app.user.reviews.add-new-review.button.title'/>
    </Button>
  );
};