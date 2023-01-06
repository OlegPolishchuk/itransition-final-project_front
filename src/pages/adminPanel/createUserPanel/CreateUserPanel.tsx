import React, { memo, useCallback, useState } from 'react';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  FormControlLabel,
  SelectChangeEvent,
} from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { RandomReviewsGenerator, SliderGenerator, Title } from 'common';
import { useAppDispatch, useAppSelector } from 'hooks';
import { LocaleSelect, UserStatusSwitcher } from 'pages';
import { locales, usersSliderValue, UserStatus } from 'shared';
import { generateRandomUsers, getTags } from 'store/actions';
import { selectIsGenerating } from 'store/selectors';
import { Locale, RandomReviewsData, RandomUserData } from 'store/types';

export const CreateUserPanel = memo(() => {
  const dispatch = useAppDispatch();

  const isGenerating = useAppSelector(selectIsGenerating);

  const [randomUsersData, setRandomUsersData] = useState<RandomUserData>({
    usersCount: 0,
    locale: locales.EN,
    status: UserStatus.Active,
  });

  const [randomReviewsData, setRandomReviewsData] = useState<RandomReviewsData>({
    reviewsCount: 0,
    tags: [],
  });

  const [expanded, setExpanded] = useState(false);

  const handleUsersSliderChange = useCallback(
    (event: Event, newValue: number | number[]): void => {
      setRandomUsersData(data => ({
        ...data,
        usersCount: newValue,
      }));
    },
    [],
  );

  const handleUsersSliderBlur = useCallback((): void => {
    if (randomUsersData.usersCount < usersSliderValue.MIN_SLIDER) {
      setRandomUsersData(data => ({ ...data, usersCount: usersSliderValue.MIN_SLIDER }));
    } else if (randomUsersData.usersCount > usersSliderValue.MAX_SLIDER_INPUT) {
      setRandomUsersData(data => ({
        ...data,
        usersCount: usersSliderValue.MAX_SLIDER_INPUT,
      }));
    }
  }, [randomUsersData.usersCount]);

  const handleSliderInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      setRandomUsersData(data => ({
        ...data,
        usersCount: event.target.value === '' ? '' : Number(event.target.value),
      }));
    },
    [],
  );

  const handleChangeStatus = useCallback((): void => {
    setRandomUsersData(data => ({
      ...data,
      status:
        randomUsersData.status === UserStatus.Active
          ? UserStatus.Blocked
          : UserStatus.Active,
    }));
  }, [randomUsersData.status]);

  const handleChangeLocale = useCallback((event: SelectChangeEvent): void => {
    setRandomUsersData(data => ({
      ...data,
      locale: event.target.value as Locale,
    }));
  }, []);

  const handleGenerate = (): void => {
    const resultData = {
      ...randomUsersData,
      ...randomReviewsData,
    };

    dispatch(generateRandomUsers(resultData));

    setRandomUsersData({
      usersCount: 0,
      locale: locales.EN,
      status: UserStatus.Active,
    });

    setRandomReviewsData({ reviewsCount: 0, tags: [] });

    setExpanded(false);
  };

  const handleToggleAccordion = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { checked } = event.target;

    if (checked) {
      dispatch(getTags());
    }

    setExpanded(checked);
  };

  return (
    <Box sx={style.mainWrapper}>
      <Box sx={style.titleWrapper}>
        <Title title={<FormattedMessage id="app.admin.generate-users.title" />} />
      </Box>

      <Accordion expanded={expanded} sx={style.accordionWrapper}>
        <AccordionSummary sx={style.accordionSummary}>
          <Box className="admin-controls-wrapper">
            <SliderGenerator
              sliderValue={usersSliderValue}
              itemsCount={randomUsersData.usersCount}
              handleSliderChange={handleUsersSliderChange}
              handleBlur={handleUsersSliderBlur}
              handleInputChange={handleSliderInputChange}
              title={<FormattedMessage id="app.admin.generate.slider-users.title" />}
            />

            <UserStatusSwitcher
              status={randomUsersData.status}
              handleChangeStatus={handleChangeStatus}
            />

            <LocaleSelect
              locale={randomUsersData.locale}
              handleChangeLocale={handleChangeLocale}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={expanded}
                  onChange={handleToggleAccordion}
                  color="secondary"
                />
              }
              label={
                <FormattedMessage id="app.admin.generate.checkbox-accordion.title" />
              }
            />
          </Box>
        </AccordionSummary>

        <Divider variant="fullWidth" />

        <AccordionDetails sx={style.accordionDetails}>
          <RandomReviewsGenerator
            data={randomReviewsData}
            setDataCallback={setRandomReviewsData}
          />
        </AccordionDetails>
      </Accordion>

      <Box sx={style.generateBtnWrapper}>
        <Button
          className="button-generate-user"
          variant="contained"
          color="secondary"
          onClick={handleGenerate}
          disabled={randomUsersData.usersCount === 0}
        >
          <FormattedMessage id="app.admin.generate.button.title" />
        </Button>

        {isGenerating && <CircularProgress size={24} sx={style.circularProgress} />}
      </Box>
    </Box>
  );
});

const style = {
  mainWrapper: {
    boxShadow: '1',
    padding: '20px 0',
    marginBottom: '30px',
  },

  titleWrapper: { margin: '0 0 30px 20px' },

  accordionWrapper: {
    marginBottom: '30px',
    padding: '10px',
    backgroundColor: 'transparent',
  },

  accordionSummary: { padding: '10px 15px' },
  accordionDetails: { marginTop: '20px' },

  generateBtnWrapper: { textAlign: 'center', position: 'relative' },

  circularProgress: {
    color: '#fff',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: '-12px',
    marginLeft: '-12px',
  },
};
