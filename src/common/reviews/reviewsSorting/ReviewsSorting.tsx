import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import React, {FC} from 'react';
import {FormControlLabel, Radio} from "@mui/material";
import {Title} from "common/title/Title";

type Props = {
  value: string;
  onChangeCallback: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ReviewsSorting: FC<Props> = ({value, onChangeCallback}) => {
  return (
    <FormControl>

      <Title
        variant={'subtitle2'}
        title={'Sorted by:'}
      />

      <RadioGroup
        row
        name="reviews-sorting-radio"
        value={value}
        onChange={onChangeCallback}
      >

        <FormControlLabel
          value="created"
          control={<Radio color={'secondary'} />}
          label="Date"
        />

        <FormControlLabel
          value="overallScore"
          control={<Radio color={'secondary'} />}
          label="Overall Score"
        />

        <FormControlLabel
          value="personalScore"
          control={<Radio color={'secondary'} />}
          label="Personal Score"
        />

      </RadioGroup>
    </FormControl>
  );
};
