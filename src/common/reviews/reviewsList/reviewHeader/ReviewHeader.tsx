import React, {FC} from 'react';
import {Box, Button} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {MainCheckbox} from "common/mainCheckbox/MainCheckbox";
import {FormattedMessage} from "react-intl";

type Props = {
  isMainCheckboxChecked: boolean;
  handleChangeMainCheckbox: (event: React.ChangeEvent<HTMLInputElement>) => void;
  deleteCallback: () => void;
}

export const ReviewHeader: FC<Props> = ({
                                          isMainCheckboxChecked,
                                          deleteCallback,
                                          handleChangeMainCheckbox
                                        }) => {

  return (
    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>

      <MainCheckbox
        checked={isMainCheckboxChecked}
        changeCallback={handleChangeMainCheckbox}
        label={<FormattedMessage id='app.user.reviews-list.main-checkbox.title'/>}
      />

      <Button
        variant={'outlined'}
        endIcon={<DeleteOutlineOutlinedIcon color={'error'}/>}
        onClick={deleteCallback}
      >
        <FormattedMessage id='app.user.reviews-list.header.button.delete.title'/>
      </Button>
    </Box>
  );
};
