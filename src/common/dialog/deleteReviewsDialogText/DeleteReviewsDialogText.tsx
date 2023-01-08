import React, { ReactElement } from 'react';

import { Divider, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { Title } from 'common/title/Title';
import { useAppSelector, useThemeColors } from 'hooks';
import { selectThemeMode } from 'store/selectors';
import { ThemeMode } from 'store/types';
import { CustomTheme } from 'theme';

type Props = {
  deleteReviews: string[];
};

export const DeleteReviewsDialogText = ({ deleteReviews }: Props): ReactElement => {
  const theme = useAppSelector(selectThemeMode);
  const colors = useThemeColors();

  return (
    <>
      <Typography variant="h3" component="p" sx={style.title(theme, colors)}>
        <FormattedMessage
          id={
            deleteReviews.length > 1
              ? 'app.dialog.text-delete-reviews.multiply.title'
              : 'app.dialog.text-delete-reviews.single.title'
          }
        />
      </Typography>

      <Divider sx={style.divider} />

      {deleteReviews.map(review => (
        <Title key={`${review}`} variant="h5" title={`id: ${review}`} />
      ))}
    </>
  );
};

const style = {
  title: (theme: ThemeMode, colors: CustomTheme) => ({
    marginBottom: '20px',
    color: theme === 'dark' ? 'rgba(255,255,255,.6)' : colors.primary.main,
  }),

  divider: { marginBottom: '20px' },
};
