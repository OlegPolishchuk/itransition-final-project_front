import React, {FC} from 'react';
import {Typography} from "@mui/material";

type Props = {
  title: React.ReactElement;
}

export const Title: FC<Props> = ({title}) => {
  return (
    <Typography
      variant={'h2'}
    >
      {title}
    </Typography>
  );
};
