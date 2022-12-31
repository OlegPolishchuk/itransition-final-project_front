import React, { ReactElement } from 'react';

import { Box, FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';

import { useAppDispatch, useAppSelector } from 'hooks';
import { locales } from 'shared';
import { changeLocale } from 'store/actions';
import { selectLocale } from 'store/selectors';
import { Locale } from 'store/types';

export const LocalePicker = (): ReactElement => {
  const dispatch = useAppDispatch();

  const locale = useAppSelector(selectLocale);

  const handleChangeLocale = (event: SelectChangeEvent): void => {
    const value = event.target.value as Locale;

    dispatch(changeLocale(value));
  };

  return (
    <Box>
      <FormControl>
        <Select
          variant="outlined"
          size="small"
          id="select-locale"
          value={locale}
          onChange={handleChangeLocale}
        >
          <MenuItem value={locales.EN}>English</MenuItem>
          <MenuItem value={locales.RU}>Русский</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
