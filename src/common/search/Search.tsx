import React, { ChangeEvent, memo, ReactElement, useState } from 'react';

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { FormControl, InputAdornment, OutlinedInput } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { inputSearchParams, routes } from 'shared';

export const Search = memo((): ReactElement => {
  const navigate = useNavigate();

  const [value, setValue] = useState('');

  const handleChangeValue = (event: ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      if (value.trim().length > 0) {
        const query = value;

        setValue('');

        navigate(`${routes.mainPage.search}?${inputSearchParams.queryTitle}=${query}`);
      }
    }
  };

  return (
    <FormControl variant="standard" sx={formControlStyle}>
      <OutlinedInput
        placeholder="Search"
        size="small"
        color="secondary"
        value={value}
        onChange={handleChangeValue}
        onKeyPress={handleKeyPress}
        startAdornment={
          <InputAdornment position="start">
            <SearchOutlinedIcon />
          </InputAdornment>
        }
      />
    </FormControl>
  );
});

const formControlStyle = {
  width: '100%',
  maxWidth: '450px',
};
