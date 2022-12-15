import React, {FC, ReactNode} from 'react';
import {Chip, ChipTypeMap} from "@mui/material";
import {OverridableComponent} from "@mui/material/OverridableComponent";

type Props = {
  title: ReactNode | string;
  clickCallback?: () => void;
}

export const Tag: FC<Props> = ({title, clickCallback, ...restProps}) => {

  const handleClick = () => {
    clickCallback && clickCallback();
  }

  return (
    <Chip
      label={title}
      onClick={handleClick}
      variant={'outlined'}
    />
  );
};
