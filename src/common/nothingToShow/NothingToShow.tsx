import React, { FC, ReactNode } from 'react';

import AssignmentLateOutlinedIcon from '@mui/icons-material/AssignmentLateOutlined';
import { Box, Typography } from '@mui/material';

import { useThemeColors } from 'hooks';

type Props = {
  title: string | ReactNode;
};

export const NothingToShow: FC<Props> = ({ title }) => {
  const colors = useThemeColors();

  return (
    <Box
      sx={{
        marginTop: '50px',
        textAlign: 'center',
        color: colors.grey.main,
      }}
    >
      <AssignmentLateOutlinedIcon
        sx={{
          width: '100px',
          height: '100px',
        }}
      />

      <Typography variant="h4">{title}</Typography>
    </Box>
  );
};
