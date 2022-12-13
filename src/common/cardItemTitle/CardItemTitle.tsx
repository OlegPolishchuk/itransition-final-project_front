import React, {FC, ReactNode} from 'react';
import {Box, Typography} from "@mui/material";
import {useThemeColors} from "hooks";

type Props = {
  title: string | ReactNode;
  description: string | ReactNode;
  color?: string;
}

export const CardItemTitle: FC<Props> = ({
                                           title,
                                           description,
                                           color,
                                         }) => {
  const colors = useThemeColors();

  return (
    <Box sx={{display: 'flex', gap: '15px'}}>

      <Typography color={colors.grey.main}>{title}:</Typography>

      <Typography
        color={color? color: ''}
        component={'span'}
      >
        {description}
      </Typography>

    </Box>
  );
};
