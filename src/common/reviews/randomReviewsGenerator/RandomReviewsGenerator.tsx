import React, {FC} from 'react';
import {Box} from "@mui/material";
import {FormattedMessage} from "react-intl";
import {Title} from "common/title/Title";
import {SliderGenerator} from "common/sliderGenerator/SliderGenerator";
import {reviewsSliderValue} from "shared/constants";
import {GenerateRandomData} from "store/types/GenerateRandomData";
import {AdminReviewsTagsPicker} from "pages";

type Props = {
  data: GenerateRandomData;
  setDataCallback: (generateRandomData: GenerateRandomData) => void;
}

export const RandomReviewsGenerator: FC<Props> = ({setDataCallback, data}) => {

  const handleReviewSliderInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newData: GenerateRandomData = {...data, reviewsCount: event.target.value};
    setDataCallback(newData)
  };

  const handleReviewsSliderChange = (event: Event, newValue: number | number[]) => {
    const newData: GenerateRandomData = {...data, reviewsCount: newValue}
    setDataCallback(newData)
  };

  const handleReviewsSliderBlur = () => {
    if (data.reviewsCount < reviewsSliderValue.MIN_SLIDER) {
      const updatedData = {...data, reviewsCount: reviewsSliderValue.MIN_SLIDER};

      setDataCallback(updatedData);
    }
    else if (data.reviewsCount > reviewsSliderValue.MAX_SLIDER) {
      const updatedData = {...data, reviewsCount: reviewsSliderValue.MAX_SLIDER};

      setDataCallback(updatedData);
    }
  }

  const handleSetTags = (tags: string[]) => {
    const updatedData = {...data, tags };

    setDataCallback(updatedData)
  }

  return (
    <Box>
      <Title
        variant={'h5'}
        title={<FormattedMessage id='app.admin.generate-reviews.title'/>}
      />

      <Box className={'admin-controls-wrapper'} mt={'20px'}>

        <AdminReviewsTagsPicker
          setTags={handleSetTags}
        />

        <SliderGenerator
          itemsCount={data.reviewsCount}
          sliderValue={reviewsSliderValue}
          handleSliderChange={handleReviewsSliderChange}
          handleBlur={handleReviewsSliderBlur}
          handleInputChange={handleReviewSliderInputChange}
          title={<FormattedMessage id='app.admin.generate.slider-reviews.title'/>}
        />

      </Box>
    </Box>
  );
};

