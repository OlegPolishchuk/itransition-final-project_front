import React, { FC, ReactNode } from 'react';

import { Checkbox, FormControlLabel } from '@mui/material';

type Props = {
  checked: boolean;
  changeCallback: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string | ReactNode;
};

export const MainCheckbox: FC<Props> = ({ checked, changeCallback, label }) => {
  return (
    <FormControlLabel
      label={label || ''}
      control={<Checkbox checked={checked} onChange={changeCallback} />}
    />
  );
};
