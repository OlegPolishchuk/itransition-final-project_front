import React, {ChangeEvent, useState} from 'react';
import {Container, FormControl, InputAdornment, OutlinedInput} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import {useNavigate} from "react-router-dom";
import {inputSearchParams, routes} from "shared";


export const Search = () => {
  const navigate = useNavigate();

  const [value, setValue] = useState('');

  const handleChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {

    if (event.key === 'Enter') {

      if (value.trim().length > 0) {
        const query = value;

        setValue('');

        navigate(`${routes.mainPage.search}?${inputSearchParams.queryTitle}=${query}`);
      }
    }
  }


  return (
    <FormControl
      variant="standard"
      sx={{
        width: '100%',
        maxWidth: '450px'
      }}>

      <OutlinedInput
        placeholder={'Search'}
        size='small'
        color='secondary'
        value={value}
        onChange={handleChangeValue}
        onKeyPress={handleKeyPress}
        startAdornment={
          <InputAdornment position="start">
            <SearchOutlinedIcon/>
          </InputAdornment>
        }
      />

    </FormControl>
  );
};
