import React, {FC, ReactNode} from 'react';
import {Chip, ChipTypeMap} from "@mui/material";
import {OverridableComponent} from "@mui/material/OverridableComponent";

type Props = {
  title: ReactNode | string;
  clickCallback?: () => void;
  size?: 'small' | 'common';
}

export const Tag: FC<Props> = ({title, clickCallback, size, ...restProps}) => {

  let style;

  switch (size) {
    case 'small':
      style = {fontSize: '14px'};
      break;
    default:
      style = {fontSize: '18px'};
      break;
  }

  const handleClick = () => {
    clickCallback && clickCallback();
  }

  return (
    <Chip
      style={style}
      label={title}
      onClick={handleClick}
      variant={'outlined'}
    />
  );
};
