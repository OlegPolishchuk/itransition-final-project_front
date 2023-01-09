import React, { FC, useState } from 'react';

import {
  Box,
  Button,
  Checkbox,
  Collapse,
  FormControlLabel,
  SelectChangeEvent,
} from '@mui/material';

import { LocaleSelect, RandomReviewsGenerator, Title, UserReviews } from 'common';
import { useAppDispatch, useAppSelector, useThemeColors } from 'hooks';
import { formatMessage, locales } from 'shared';
import { generateRandomReviews, getTags } from 'store/actions';
import { selectTags, selectThemeMode } from 'store/selectors';
import { Locale, RandomReviewsData, ThemeMode } from 'store/types';
import { CustomTheme } from 'theme';

const localeMessage = formatMessage('');

type Props = {
  userId: string;
};

export const AdminUserReviews: FC<Props> = ({ userId }) => {
  const dispatch = useAppDispatch();

  const tags = useAppSelector(selectTags);
  const theme = useAppSelector(selectThemeMode);

  const [randomReviewsData, setRandomReviewData] = useState<RandomReviewsData>({
    reviewsCount: 0,
    tags,
    locale: locales.EN,
  });

  const [showGeneratorPanel, setShowGeneratorPanel] = useState(false);

  const colors = useThemeColors();

  const handleToggleAccordion = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { checked } = event.target;

    if (checked) {
      dispatch(getTags());
    }

    setShowGeneratorPanel(event.target.checked);
  };

  const handleGenerateRandomReviews = (): void => {
    dispatch(generateRandomReviews({ data: randomReviewsData, userId }));

    setRandomReviewData({ reviewsCount: 0, tags: [], locale: locales.EN });
    setShowGeneratorPanel(false);
  };

  const handleChangeLocale = (event: SelectChangeEvent): void => {
    setRandomReviewData(data => ({
      ...data,
      locale: event.target.value as Locale,
    }));
  };

  return (
    <Box sx={style.wrapper}>
      <Title variant="h4" title={localeMessage('user.reviews')} />

      <Box sx={style.controlsWrapper}>
        <FormControlLabel
          sx={style.controlCheckbox}
          control={
            <Checkbox
              checked={showGeneratorPanel}
              onChange={handleToggleAccordion}
              color="secondary"
            />
          }
          label={localeMessage('user.reviews-list.header.collapse-button')}
        />

        <Collapse sx={style.collapse} in={showGeneratorPanel}>
          <Box sx={style.reviewGeneratorWrapper(theme, colors)}>
            <RandomReviewsGenerator
              data={randomReviewsData}
              setDataCallback={setRandomReviewData}
            >
              <LocaleSelect
                locale={randomReviewsData.locale as string}
                handleChangeLocale={handleChangeLocale}
              />
            </RandomReviewsGenerator>

            <Box sx={style.buttonGenerateWrapper}>
              <Button
                className="button-generate-user"
                variant="contained"
                color="secondary"
                onClick={handleGenerateRandomReviews}
                disabled={randomReviewsData.reviewsCount === 0}
              >
                {localeMessage('admin.generate.button')}
              </Button>
            </Box>
          </Box>
        </Collapse>
      </Box>

      <UserReviews userId={userId} isMyProfile />
    </Box>
  );
};

const style = {
  wrapper: { marginTop: '50px' },

  controlsWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },

  controlCheckbox: { alignSelf: 'flex-end' },

  collapse: { margin: '30px 0' },

  reviewGeneratorWrapper: (themeMode: ThemeMode, colors: CustomTheme) => ({
    width: '100%',
    padding: '16px',
    backgroundColor: themeMode === 'dark' ? colors.primary.main : '#fff',
    backgroundImage:
      'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05));',
  }),

  buttonGenerateWrapper: {
    margin: '30px 0',
    textAlign: 'center',
  },
};
