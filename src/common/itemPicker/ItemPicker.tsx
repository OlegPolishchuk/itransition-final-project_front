import React, {FC} from 'react';
import {FormControl, MenuItem, Select, SelectChangeEvent} from "@mui/material";

type Props = {
  valueList: string[]
  changeValueCallback: (event: SelectChangeEvent) => void;
  startValue: string;
}

export const ItemPicker: FC<Props> = ({changeValueCallback, valueList, startValue}) => {

  return (
    <FormControl>
      <Select
        variant='outlined'
        size='small'
        id='select-locale'
        value={startValue}
        onChange={changeValueCallback}
      >

        {valueList.map(value => (
          <MenuItem
            key={value}
            value={value}
          >
            {value}
          </MenuItem>
        ))}

      </Select>
    </FormControl>
  );
};
