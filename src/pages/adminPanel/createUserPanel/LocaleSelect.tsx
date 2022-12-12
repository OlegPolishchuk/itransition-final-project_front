import React, {FC} from 'react';
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography
} from "@mui/material";
import {FormattedMessage} from "react-intl";

type Props = {
  locale: string;
  handleChangeLocale: (event: SelectChangeEvent) => void;
}

export const LocaleSelect: FC<Props> = ({locale, handleChangeLocale}) => {
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

