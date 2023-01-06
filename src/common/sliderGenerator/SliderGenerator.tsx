import React, { ChangeEvent, memo, ReactElement, ReactNode } from 'react';

import { Box, Input, Slider, Typography } from '@mui/material';

import { SliderValues } from 'store/types';

type Props = {
  itemsCount: number | string | Array<number | string>;
  sliderValue: SliderValues;
  handleSliderChange: (event: Event, newValue: number | number[]) => void;
  handleBlur: () => void;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  title?: ReactNode;
};

export const SliderGenerator = memo(
  ({
    sliderValue,
    itemsCount,
    handleSliderChange,
    handleBlur,
    handleInputChange,
    title,
  }: Props): ReactElement => {
    const { MAX_SLIDER, MIN_SLIDER, MAX_SLIDER_INPUT, MARKS } = sliderValue;

    return (
      <Box className="slider-box">
        {title && (
          <Typography id="input-slider" gutterBottom>
            {title}
          </Typography>
        )}

        <Box className="slider-wrapper">
          <Slider
            color="secondary"
            value={typeof itemsCount === 'number' ? itemsCount : 0}
            onChange={handleSliderChange}
            step={1}
            marks={MARKS}
            min={MIN_SLIDER}
            max={MAX_SLIDER}
          />

          <Input
            value={itemsCount}
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
  },
);
