import React, { memo, ReactElement } from 'react';

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Box, Button } from '@mui/material';

import { MainCheckbox } from 'common/mainCheckbox/MainCheckbox';
import { formatMessage } from 'shared';

const localeMessage = formatMessage('user.reviews-list');

type Props = {
  isMainCheckboxChecked: boolean;
  handleChangeMainCheckbox: (event: React.ChangeEvent<HTMLInputElement>) => void;
  deleteCallback: () => void;
  disabled: boolean;
};

export const ReviewHeader = memo(
  ({
    isMainCheckboxChecked,
    deleteCallback,
    handleChangeMainCheckbox,
    disabled,
  }: Props): ReactElement => {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <MainCheckbox
          checked={isMainCheckboxChecked}
          changeCallback={handleChangeMainCheckbox}
          label={localeMessage('main-checkbox')}
        />

        <Button
          variant="outlined"
          endIcon={<DeleteOutlineOutlinedIcon color="error" />}
          onClick={deleteCallback}
          disabled={disabled}
          sx={{ marginLeft: '20px' }}
        >
          {localeMessage('header.button.delete')}
        </Button>
      </Box>
    );
  },
);
