import React, { FC, useState } from 'react';

import { Box, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';

import { TagsPicker } from 'common';
import { formatMessage } from 'shared';

const localeMessage = formatMessage('admin.generate.tags-picker');

type Props = {
  setTags: (tags: string[]) => void;
};

export const AdminReviewsTagsPicker: FC<Props> = ({ setTags }) => {
  const [randomTags, setRandomTags] = useState('random');

  const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setRandomTags(event.target.value);
  };

  return (
    <Box>
      <FormControl>
        <RadioGroup
          row
          name="chose-tags-radio-buttons-group"
          value={randomTags}
          onChange={handleChangeRadio}
        >
          <FormControlLabel
            value="random"
            control={<Radio color="secondary" />}
            label={localeMessage('radio-random')}
          />

          <FormControlLabel
            value="custom"
            control={<Radio color="secondary" />}
            label={localeMessage('radio-custom')}
          />
        </RadioGroup>
      </FormControl>

      {randomTags !== 'random' && (
        <Box sx={{ maxWidth: '400px' }}>
          <TagsPicker handleChangeOptionCallback={setTags} />
        </Box>
      )}
    </Box>
  );
};
