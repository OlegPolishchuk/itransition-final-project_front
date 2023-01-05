import React, { FC, memo } from 'react';

import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import NightlightOutlinedIcon from '@mui/icons-material/NightlightOutlined';
import { Box, IconButton } from '@mui/material';

import { ThemeMode } from 'store/types';

type Props = {
  themeMode: ThemeMode;
  callback: () => void;
};

export const ThemeToggle: FC<Props> = memo(({ themeMode, callback }: Props) => {
  return (
    <Box>
      <IconButton onClick={callback}>
        {themeMode === 'light' ? <LightModeOutlinedIcon /> : <NightlightOutlinedIcon />}
      </IconButton>
    </Box>
  );
});
