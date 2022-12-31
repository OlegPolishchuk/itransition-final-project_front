import React, { ElementType, FC } from 'react';

import { Typography } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';
import { TypographyPropsVariantOverrides } from '@mui/material/Typography/Typography';
// eslint-disable-next-line import/no-unresolved
import { OverridableStringUnion } from '@mui/types';

type Props = {
  title: React.ReactElement | string;
  color?: string;
  variant?: OverridableStringUnion<Variant | 'inherit', TypographyPropsVariantOverrides>;
  component?: ElementType;
};

export const Title: FC<Props> = ({ title, component, color, variant }) => {
  return (
    <Typography
      component={component || 'p'}
      color={color || ''}
      variant={variant || 'h4'}
    >
      {title}
    </Typography>
  );
};
