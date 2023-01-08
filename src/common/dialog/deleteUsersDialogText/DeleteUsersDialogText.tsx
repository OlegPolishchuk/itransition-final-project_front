import React, { ReactElement } from 'react';

import { Divider, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { Title } from 'common/title/Title';
import { useAppSelector, useThemeColors } from 'hooks';
import { selectThemeMode } from 'store/selectors';
import { ThemeMode } from 'store/types';
import { CustomTheme } from 'theme';

type Props = {
  usersIdToDelete: string[];
};

export const DeleteUsersDialogText = ({ usersIdToDelete }: Props): ReactElement => {
  const theme = useAppSelector(selectThemeMode);
  const colors = useThemeColors();

  return (
    <>
      <Typography variant="h3" component="p" sx={style.title(theme, colors)}>
        <FormattedMessage
          id={
            usersIdToDelete.length > 1
              ? 'app.dialog.text-delete-users.multiply.title'
              : 'app.dialog.text-delete-users.single.title'
          }
        />
      </Typography>

      <Divider sx={style.divider} />

      {usersIdToDelete.map(user => (
        <Title key={`${user}`} variant="h5" title={`id: ${user}`} />
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
