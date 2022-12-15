import React, {ElementType, FC, ReactElement} from 'react';
import {Typography} from "@mui/material";
import {OverridableStringUnion} from "@mui/types";
import {Variant} from "@mui/material/styles/createTypography";
import {TypographyPropsVariantOverrides} from "@mui/material/Typography/Typography";

type Props = {
  title: React.ReactElement | string;
  color?: string;
  variant?: OverridableStringUnion<Variant | 'inherit', TypographyPropsVariantOverrides>
  component?: ElementType;
}

export const Title: FC<Props> = ({
                                   title,
                                   component,
                                   color,
                                   variant
                                 }) => {
  return (
    <Typography
      component={component ? component : 'p'}
      color={color ? color : ''}
      variant={variant ? variant : 'h4'}
    >
      {title}
    </Typography>
  );
};
