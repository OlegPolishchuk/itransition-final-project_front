import React, {ChangeEvent, FC} from 'react';
import {Box, Input, Slider, Typography} from "@mui/material";
import {FormattedMessage} from "react-intl";
import {SliderValues} from "store/types/SliderValues";

type Props = {
  usersCount: number | string | Array<number | string>;
  sliderValue: SliderValues;
  handleSliderChange: (event: Event, newValue: number | number[]) => void;
  handleBlur: () => void;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const CreateUserSlider: FC<Props> = ({
                                              sliderValue,
                                              usersCount,
                                              handleSliderChange,
                                              handleBlur,
                                              handleInputChange,
                                            }) => {
  const {MAX_SLIDER, MIN_SLIDER, MAX_SLIDER_INPUT, MARKS} = sliderValue;


  return (
    <Box className={'slider-box'}>
      <Typography id="input-slider" gutterBottom>
        <FormattedMessage id='app.admin.generate.slider.title'/>
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
            min: MIN_SLIDER,
            max: MAX_SLIDER_INPUT,
            type: 'number',
          }}
        />
      </Box>
    </Box>
  );
};
