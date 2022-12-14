import React, { memo, ReactElement, ReactNode } from 'react';

import { Box } from '@mui/material';

import { SliderGenerator } from 'common/sliderGenerator/SliderGenerator';
import { Title } from 'common/title/Title';
import { AdminReviewsTagsPicker } from 'pages';
import { formatMessage } from 'shared';
import { reviewsSliderValue } from 'shared/constants';
import { RandomReviewsData } from 'store/types/randomGenerator/RandomReviewsData';

const localeMessage = formatMessage('admin');

type Props = {
  data: RandomReviewsData;
  setDataCallback: (data: RandomReviewsData) => void;
  children?: ReactNode;
};

export const RandomReviewsGenerator = memo(
  ({ setDataCallback, data, children }: Props): ReactElement => {
    const handleReviewSliderInputChange = (
      event: React.ChangeEvent<HTMLInputElement>,
    ): void => {
      const newData: RandomReviewsData = { ...data, reviewsCount: event.target.value };

      setDataCallback(newData);
    };

    const handleReviewsSliderChange = (
      event: Event,
      newValue: number | number[],
    ): void => {
      const newData: RandomReviewsData = { ...data, reviewsCount: newValue };

      setDataCallback(newData);
    };

    const handleReviewsSliderBlur = (): void => {
      if (data.reviewsCount < reviewsSliderValue.MIN_SLIDER) {
        const updatedData = { ...data, reviewsCount: reviewsSliderValue.MIN_SLIDER };

        setDataCallback(updatedData);
      } else if (data.reviewsCount > reviewsSliderValue.MAX_SLIDER) {
        const updatedData = { ...data, reviewsCount: reviewsSliderValue.MAX_SLIDER };

        setDataCallback(updatedData);
      }
    };

    const handleSetTags = (tags: string[]): void => {
      const updatedData = { ...data, tags };

      setDataCallback(updatedData);
    };

    return (
      <Box>
        <Title variant="h5" title={localeMessage('generate-reviews')} />

        <Box className="admin-controls-wrapper" mt="20px">
          <AdminReviewsTagsPicker setTags={handleSetTags} />

          <SliderGenerator
            itemsCount={data.reviewsCount}
            sliderValue={reviewsSliderValue}
            handleSliderChange={handleReviewsSliderChange}
            handleBlur={handleReviewsSliderBlur}
            handleInputChange={handleReviewSliderInputChange}
            title={localeMessage('generate.slider-reviews')}
          />

          {children && children}
        </Box>
      </Box>
    );
  },
);
