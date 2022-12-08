import React, {useState} from 'react';
import {Box, Input, Slider, Typography} from "@mui/material";
import {sliderValue} from "shared";
import {FormattedMessage} from "react-intl";

export const CreateUserSlider = () => {
  const [usersCount, setUsersCount] = useState<number | string | Array<number | string>>(0);

  const {MAX_SLIDER, MIN_SLIDER, MARKS} = sliderValue;

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setUsersCount(newValue);
  };

  const handleBlur = () => {
    if (usersCount < 0) {
      setUsersCount(0);
    } else if (usersCount > 100) {
      setUsersCount(100);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsersCount(event.target.value === '' ? '' : Number(event.target.value));
  };

  return (
    <Box className={'slider-box'}>
      <Typography id="input-slider" gutterBottom>
        <FormattedMessage id='app.admin.generate.slider.title' />
      </Typography>

      <Box className={'slider-wrapper'}>
        <Slider
          color={'secondary'}
          value={typeof usersCount === 'number' ? usersCount : 0}
          onChange={handleSliderChange}
          step={1}
          marks={MARKS}
          min={MIN_SLIDER}
          max={MAX_SLIDER}
        />

        <Input
          value={usersCount}
          size="small"
          onChange={handleInputChange}
          onBlur={handleBlur}
          inputProps={{
            step: 10,
            min: 0,
            max: 100,
            type: 'number',
            'aria-labelledby': 'input-slider',
          }}
        />
      </Box>
    </Box>
  );
};
