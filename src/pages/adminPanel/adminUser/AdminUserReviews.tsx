import React, { FC, useState } from 'react';

import {
  Box,
  Button,
  Checkbox,
  Collapse,
  FormControlLabel,
  SelectChangeEvent,
} from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { LocaleSelect, RandomReviewsGenerator, Title, UserReviews } from 'common';
import { useAppDispatch, useAppSelector, useThemeColors } from 'hooks';
import { locales } from 'shared';
import { generateRandomReviews, getTags } from 'store/actions';
import { selectTags, selectThemeMode } from 'store/selectors';
import { Locale, RandomReviewsData } from 'store/types';

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
    <Box sx={{ marginTop: '50px' }}>
      <Title variant="h4" title={<FormattedMessage id="app.user.reviews.title" />} />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <FormControlLabel
          sx={{ alignSelf: 'flex-end' }}
          control={
            <Checkbox
              checked={showGeneratorPanel}
              onChange={handleToggleAccordion}
              color="secondary"
            />
          }
          label={
            <FormattedMessage id="app.user.reviews-list.header.collapse-button.title" />
          }
        />

        <Collapse sx={{ margin: '30px 0' }} in={showGeneratorPanel}>
          <Box
            sx={{
              width: '100%',
              padding: '16px',
              backgroundColor: theme === 'dark' ? colors.primary.main : '#fff',
              backgroundImage:
                'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05));',
            }}
          >
            <RandomReviewsGenerator
              data={randomReviewsData}
              setDataCallback={setRandomReviewData}
            >
              <LocaleSelect
                locale={randomReviewsData.locale as string}
                handleChangeLocale={handleChangeLocale}
              />
            </RandomReviewsGenerator>

            <Box
              sx={{
                margin: '30px 0',
                textAlign: 'center',
              }}
            >
              <Button
                className="button-generate-user"
                variant="contained"
                color="secondary"
                onClick={handleGenerateRandomReviews}
                disabled={randomReviewsData.reviewsCount === 0}
              >
                <FormattedMessage id="app.admin.generate.button.title" />
              </Button>
            </Box>
          </Box>
        </Collapse>
      </Box>

      <UserReviews userId={userId} isMyProfile />
    </Box>
  );
};
