import React, {FC} from 'react';
import {useThemeColors} from "hooks";
import {Rating, Tooltip} from "@mui/material";
import {FormattedMessage} from "react-intl";


type Props = {
  personalScore: number;
}

export const PersonalScore: FC<Props> = ({personalScore}) => {
  const colors = useThemeColors();

  return (
    <Tooltip
      title={<FormattedMessage id='app.overall-score.tooltip.title'/>}
    >
      <Rating
        value={personalScore}
        max={10}
        readOnly
        size={'small'}
      />

    </Tooltip>
  );
};