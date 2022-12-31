import React, { FC } from 'react';

import { FormControlLabel, Radio, useMediaQuery } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import { FormattedMessage } from 'react-intl';

import { Title } from 'common/title/Title';

type Props = {
  value: string;
  onChangeCallback: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const ReviewsSorting: FC<Props> = ({ value, onChangeCallback }) => {
  const isRowDirection = useMediaQuery('(min-width: 600px)');

  return (
    <FormControl>
      <Title
        variant="subtitle2"
        title={<FormattedMessage id="app.user.reviews-list.sorting.title" />}
      />

      <RadioGroup
        row={isRowDirection}
        name="reviews-sorting-radio"
        value={value}
        onChange={onChangeCallback}
      >
        <FormControlLabel
          value="created"
          control={<Radio color="secondary" />}
          label={<FormattedMessage id="app.user.reviews-list.sorting.date-radio.title" />}
        />

        <FormControlLabel
          value="overallScore"
          control={<Radio color="secondary" />}
          label={
            <FormattedMessage id="app.user.reviews-list.sorting.overallScore-radio.title" />
          }
        />

        <FormControlLabel
          value="personalScore"
          control={<Radio color="secondary" />}
          label={
            <FormattedMessage id="app.user.reviews-list.sorting.personalScore-radio.title" />
          }
        />
      </RadioGroup>
    </FormControl>
  );
};
