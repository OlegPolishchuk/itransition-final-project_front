import React, {FC} from 'react';
import {Box, Typography} from "@mui/material";
import {Tag} from "common/tags/tag/Tag";

type Props = {
  tags: string[];
}

export const ReviewItemFooter: FC<Props> = ({tags}) => {

  const handleClick = () => {

  }

  return (
    <Box>
      {tags.map(tag => (
        <Tag
          key={tag}
          title={tag}
          clickCallback={handleClick}
        />
      ))}
    </Box>
  );
};
