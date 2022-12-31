import React, { FC } from 'react';

import { Rating } from '@mui/material';

type Props = {
  personalScore: number;
};

export const PersonalScore: FC<Props> = ({ personalScore }) => {
  return <Rating value={personalScore} max={10} readOnly size="small" />;
};
