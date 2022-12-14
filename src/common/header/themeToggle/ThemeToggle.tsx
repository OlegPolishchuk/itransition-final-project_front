import React, {FC} from 'react';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import NightlightOutlinedIcon from '@mui/icons-material/NightlightOutlined';
import {Box, IconButton} from "@mui/material";
import {ThemeMode} from "store/types";

type Props = {
  themeMode: ThemeMode;
  callback: () => void;
}

export const ThemeToggle: FC<Props> = ({themeMode, callback}) => {
  return (
    <Box>
      <IconButton onClick={callback}>
        {themeMode === 'light'
          ? <LightModeOutlinedIcon />
          : <NightlightOutlinedIcon />
        }
      </IconButton>
    </Box>
  );
};
