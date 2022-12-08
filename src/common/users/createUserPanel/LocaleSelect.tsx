import React, {useState} from 'react';
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography
} from "@mui/material";
import {locales} from "shared";
import {FormattedMessage} from "react-intl";

export const LocaleSelect = () => {
  const [locale, setLocale] = useState(locales.EN);
  const handleChangeLocale = (event: SelectChangeEvent) => {
    setLocale(event.target.value as string);
  }

  return (
    <Box className={'locale-select-wrapper'}>
      <Typography id="input-slider" gutterBottom>
        <FormattedMessage id='app.admin.generate.select.locale.title' />
      </Typography>

      <FormControl fullWidth>
        <Select
          color={'secondary'}
          value={locale}
          onChange={handleChangeLocale}
        >
          <MenuItem value={'en'}>English</MenuItem>
          <MenuItem value={'ru'}>Русский</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

