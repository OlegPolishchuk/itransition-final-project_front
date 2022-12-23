import React, {FC} from 'react';
import {Box, Button} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {MainCheckbox} from "common/mainCheckbox/MainCheckbox";
import {FormattedMessage} from "react-intl";
import {BaseNavLink} from "common/baseNavLink/BaseNavLink";
import {AddNewReview} from "pages";
import {routes} from "shared";
import {AddNewReviewButton} from "common/addNewReviewButton/AddNewReviewButton";

type Props = {
  isMainCheckboxChecked: boolean;
  handleChangeMainCheckbox: (event: React.ChangeEvent<HTMLInputElement>) => void;
  deleteCallback: () => void;
  disabled: boolean;
}

export const ReviewHeader: FC<Props> = ({
                                          isMainCheckboxChecked,
                                          deleteCallback,
                                          handleChangeMainCheckbox,
                                          disabled
                                        }) => {

  return (
    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>

      <MainCheckbox
        checked={isMainCheckboxChecked}
        changeCallback={handleChangeMainCheckbox}
        label={<FormattedMessage id='app.user.reviews-list.main-checkbox.title'/>}
      />

      <Box>
        <AddNewReviewButton />

        <Button
          variant={'outlined'}
          endIcon={<DeleteOutlineOutlinedIcon color={'error'}/>}
          onClick={deleteCallback}
          disabled={disabled}
          sx={{marginLeft: '20px'}}
        >
          <FormattedMessage id='app.user.reviews-list.header.button.delete.title'/>
        </Button>
      </Box>

    </Box>
  );
};
