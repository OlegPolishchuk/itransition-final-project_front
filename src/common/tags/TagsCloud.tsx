import React, { ReactElement, useEffect } from 'react';

import { Box } from '@mui/material';

import { Tag } from './tag/Tag';

import { useAppDispatch, useAppSelector } from 'hooks';
import { getTags } from 'store/actions';
import { selectTags } from 'store/selectors';

export const TagsCloud = (): ReactElement => {
  const dispatch = useAppDispatch();

  const tags = useAppSelector(selectTags);

  useEffect(() => {
    dispatch(getTags());
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px 10px',
      }}
    >
      {tags.map(tag => (
        <Tag title={tag} key={tag} />
      ))}
    </Box>
  );
};
