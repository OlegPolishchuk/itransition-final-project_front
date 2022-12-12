import React, {FC} from 'react';
import {Typography} from "@mui/material";
import {OverridableStringUnion} from "@mui/types";
import {Variant} from "@mui/material/styles/createTypography";
import {TypographyPropsVariantOverrides} from "@mui/material/Typography/Typography";

type Props = {
  title: React.ReactElement;
  color?: string;
  variant?: OverridableStringUnion<Variant | 'inherit', TypographyPropsVariantOverrides>
}

export const Title: FC<Props> = ({title, color, variant}) => {
  return (
    <Typography
      color={color ? color : ''}
      variant={ variant ? variant : 'h4'}
    >
      {title}
    </Typography>
  );
};
