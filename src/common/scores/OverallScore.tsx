import Box from '@mui/material/Box';
import React, {FC} from 'react';
import {overallScoreData} from "shared/constants";
import {useThemeColors} from "hooks";
import {Tooltip} from "@mui/material";
import {FormattedMessage} from "react-intl";


type Props = {
  overallScore: number;
  isSmall?: boolean;
  color?: string;
}

export const OverallScore: FC<Props> = ({overallScore, color, isSmall}) => {
  const colors = useThemeColors();

  const size = isSmall ? '12px' : '16px';

  const styles = {
    padding: '5px',
    fontSize: size,
    borderRadius: '50%',
    color: color ? color : colors.warning.second,
    border: '1px solid',
  }

  return (
    <Tooltip
      title={<FormattedMessage id='app.overall-score.tooltip.title'/>}
    >

      <Box style={styles}>
        <span>
          {`${overallScore} / ${overallScoreData.max}`}
        </span>
      </Box>

    </Tooltip>
  );
};