import React, { CSSProperties, memo, ReactElement } from 'react';

import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';

type Props = {
  valueList: string[];
  changeValueCallback: (event: SelectChangeEvent) => void;
  value: string;
  style?: CSSProperties;
};

export const ItemPicker = memo(
  ({ changeValueCallback, valueList, value, style }: Props): ReactElement => {
    console.log('itemPicker rendered');

    return (
      <FormControl style={style || {}}>
        <Select
          variant="outlined"
          size="small"
          color="secondary"
          value={value}
          onChange={changeValueCallback}
        >
          {valueList.map(value => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  },
);
