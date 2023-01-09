import React, { memo, ReactElement } from 'react';

import { FormControlLabel, Radio, useMediaQuery } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';

import { Title } from 'common/title/Title';
import { formatMessage } from 'shared';

const localeMessage = formatMessage('user.reviews-list');

type Props = {
  value: string;
  onChangeCallback: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const ReviewsSorting = memo(({ value, onChangeCallback }: Props): ReactElement => {
  const isRowDirection = useMediaQuery('(min-width: 600px)');

  return (
    <FormControl>
      <Title variant="subtitle2" title={localeMessage('sorting')} />

      <RadioGroup
        row={isRowDirection}
        name="reviews-sorting-radio"
        value={value}
        onChange={onChangeCallback}
      >
        <FormControlLabel
          value="created"
          control={<Radio color="secondary" />}
          label={localeMessage('sorting.date-radio')}
        />

        <FormControlLabel
          value="overallScore"
          control={<Radio color="secondary" />}
          label={localeMessage('sorting.overallScore-radio')}
        />

        <FormControlLabel
          value="personalScore"
          control={<Radio color="secondary" />}
          label={localeMessage('sorting.personalScore-radio')}
        />
      </RadioGroup>
    </FormControl>
  );
});
