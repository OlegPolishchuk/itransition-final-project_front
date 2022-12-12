import React, {FC, useState} from 'react';
import {Box, FormControl, FormControlLabel, Radio, RadioGroup} from "@mui/material";
import {TagsPicker} from "common";
import {FormattedMessage} from "react-intl";

type Props = {
  setTags: (tags: string[]) => void;
}

export const AdminReviewsTagsPicker: FC<Props> = ({setTags}) => {
  const [randomTags, setRandomTags] = useState('random');

  const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRandomTags((event.target.value))
  }

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
            value={'random'}
            control={<Radio color={'secondary'} />}
            label={<FormattedMessage id='app.admin.generate.tags-picker.radio-random.title'/>}
          />

          <FormControlLabel
            value={'custom'}
            control={<Radio color={'secondary'} />}
            label={<FormattedMessage id='app.admin.generate.tags-picker.radio-custom.title'/>}
          />

        </RadioGroup>
      </FormControl>

      {randomTags !== 'random' && (
        <Box sx={{maxWidth: '400px'}}>
          <TagsPicker
            handleChangeOptionCallback={setTags}
          />
        </Box>
      )}

    </Box>
  );
};
