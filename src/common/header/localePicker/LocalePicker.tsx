import React from 'react';
import {Box, FormControl, MenuItem, Select, SelectChangeEvent} from "@mui/material";

import {locales} from 'shared';
import {useAppDispatch, useAppSelector} from "hooks";
import {selectLocale} from "store/selectors";
import {Locale} from "store/types";
import {changeLocale} from "store/actions";


export const LocalePicker = () => {
  const dispatch = useAppDispatch();

  const locale = useAppSelector(selectLocale);

  const handleChangeLocale = (event: SelectChangeEvent) => {
    const value = event.target.value as Locale;

    dispatch(changeLocale(value))
  }

  return (
    <Box>
      <FormControl>
        <Select
          variant='outlined'
          size='small'
          id='select-locale'
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
