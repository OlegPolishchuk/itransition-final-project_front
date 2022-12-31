import React, { FC } from 'react';

import { Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { routes } from 'shared';

type Props = {
  title: string;
  clickCallback?: (title: string) => void;
  size?: 'small' | 'medium';
};

export const Tag: FC<Props> = ({ title, clickCallback, size }) => {
  const navigate = useNavigate();

  let style;

  switch (size) {
    case 'small':
      style = { fontSize: '14px' };
      break;
    default:
      style = { fontSize: '18px' };
      break;
  }

  const handleClick = (): void => {
    if (clickCallback) {
      clickCallback(title);
    } else {
      navigate(`${routes.tags.base}?tag=${title}`);
    }
  };

  return <Chip style={style} label={title} onClick={handleClick} variant="outlined" />;
};
