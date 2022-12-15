import React, {FC} from 'react';
import {Box, Typography, useMediaQuery} from "@mui/material";
import {Title} from "common/title/Title";
import {BaseNavLink} from "common/baseNavLink/BaseNavLink";
import {useThemeColors} from "hooks";
import {OverallScore} from "common/scores";

type Props = {
  title: string;
  subtitle: string;
  body: string;
  overallScore: number;
}

export const ReviewItemBody: FC<Props> = ({body, title, subtitle, overallScore}) => {
  const colors = useThemeColors();
  const smallScreen = useMediaQuery('(max-width: 600px)');

  return (
    <Box>

      <Box mb={'20px'}>
        <BaseNavLink to={'/'}>
          <Title variant={'h3'} title={title} />
        </BaseNavLink>

        <Box display={'flex'} justifyContent={'space-between'} mt={'10px'}>
          <Title variant={'h4'} title={subtitle} />
          <OverallScore
            overallScore={overallScore}
            isSmall={smallScreen}
          />
        </Box>
      </Box>

      <Box sx={{
        maxHeight: '300px',
        overflow: 'hidden',
        paddingBottom: '15px',
      }}>
        {body}
      </Box>

      <Box pt={'15px'}>
        <BaseNavLink to={'/'} color={colors.secondary.main}>
          Показать полностью
        </BaseNavLink>
      </Box>
    </Box>
  );
};
