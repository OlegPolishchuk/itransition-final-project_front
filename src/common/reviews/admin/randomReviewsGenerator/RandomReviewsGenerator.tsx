import React, {FC, ReactNode} from 'react';
import {Box} from "@mui/material";
import {FormattedMessage} from "react-intl";
import {Title} from "common/title/Title";
import {SliderGenerator} from "common/sliderGenerator/SliderGenerator";
import {reviewsSliderValue} from "shared/constants";
import {RandomUserData} from "store/types/randomGenerator/RandomUserData";
import {AdminReviewsTagsPicker} from "pages";
import {RandomReviewsData} from "store/types/randomGenerator/RandomReviewsData";

type Props = {
  data: RandomReviewsData;
  setDataCallback: (data: RandomReviewsData) => void;
  children?: ReactNode;
}

export const RandomReviewsGenerator: FC<Props> = ({setDataCallback, data, children}) => {

  const handleReviewSliderInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newData: RandomReviewsData = {...data, reviewsCount: event.target.value};
    setDataCallback(newData)
  };

  const handleReviewsSliderChange = (event: Event, newValue: number | number[]) => {
    const newData: RandomReviewsData = {...data, reviewsCount: newValue}
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

        {children && children}

      </Box>
    </Box>
  );
};
