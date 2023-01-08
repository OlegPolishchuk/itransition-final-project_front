import React, { memo } from 'react';

import { Box } from '@mui/material';
import MDEditor from '@uiw/react-md-editor';
import { FormattedMessage } from 'react-intl';

import { BaseNavLink, Title } from 'common';
import { useAppSelector, useThemeColors } from 'hooks';
import { routes } from 'shared';
import { selectThemeMode } from 'store/selectors';
import { ThemeMode } from 'store/types';
import { CustomTheme } from 'theme';

type Props = {
  title: string;
  body: string;
  reviewId: string;
  isHide: boolean;
};

export const ReviewItemBody = memo(({ body, title, reviewId, isHide }: Props) => {
  const colors = useThemeColors();
  const theme = useAppSelector(selectThemeMode);

  return (
    <Box>
      <Box mb="20px">
        <BaseNavLink to={`${routes.review.base}/${reviewId}`}>
          <Title variant="h3" title={title} />
        </BaseNavLink>
      </Box>

      <Box sx={style.MDEditorWrapperStyle(isHide)}>
        <MDEditor.Markdown
          className="MDEditor"
          source={body}
          style={style.MDEditorStyle(theme, colors)}
        />
      </Box>

      {isHide && (
        <Box pt="15px">
          <BaseNavLink
            to={`${routes.review.base}/${reviewId}`}
            color={colors.secondary.main}
          >
            <FormattedMessage id="app.review-body.see-more-button.title" />
          </BaseNavLink>
        </Box>
      )}
    </Box>
  );
});

const style = {
  MDEditorStyle: (theme: ThemeMode, colors: CustomTheme) =>
    ({
      whiteSpace: 'pre-wrap',
      backgroundColor: theme === 'dark' ? colors.primary.main : '#fff',
      backgroundImage:
        'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))',
      color: theme === 'dark' ? 'rgba(255,255,255,.6)' : colors.primary.main,
      // color: colors.primary.main,
    } as const),

  MDEditorWrapperStyle: (isHide: boolean) =>
    ({
      maxHeight: isHide ? '300px' : '100%',
      overflow: isHide ? 'hidden' : '',
      paddingBottom: '15px',
    } as const),
};
