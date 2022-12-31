import React, { FC } from 'react';

import { Box, SelectChangeEvent, Typography, useMediaQuery } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { ItemPicker } from 'common/itemPicker/ItemPicker';
import { groups } from 'shared/constants';

type Props = {
  changeCallback: (event: SelectChangeEvent) => void;
  value: string;
};

export const GroupPicker: FC<Props> = ({ changeCallback, value }) => {
  const isSmallScreen = useMediaQuery('(max-width: 600px)');

  return (
    <Box sx={{ width: isSmallScreen ? '100%' : 'auto' }}>
      <Typography id="input-slider" gutterBottom>
        <FormattedMessage id="app.admin.generate.group-picker.title" />
      </Typography>

      <ItemPicker
        valueList={groups}
        changeValueCallback={changeCallback}
        value={value}
        style={{ width: isSmallScreen ? '100%' : 'auto' }}
      />
    </Box>
  );
};
