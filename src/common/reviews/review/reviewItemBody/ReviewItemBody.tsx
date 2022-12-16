import React, {FC} from 'react';
import {Box, useMediaQuery} from "@mui/material";
import {Title} from "common/title/Title";
import {BaseNavLink} from "common/baseNavLink/BaseNavLink";
import {useThemeColors} from "hooks";
import {OverallScore} from "common/scores";
import {routes} from "shared";
import {FormattedMessage} from "react-intl";

type Props = {
  title: string;
  subtitle: string;
  body: string;
  overallScore: number;
  reviewId: string;
  isHide: boolean;
}

export const ReviewItemBody: FC<Props> = ({
                                            body,
                                            title,
                                            subtitle,
                                            overallScore,
                                            reviewId,
                                            isHide
                                          }) => {
  const colors = useThemeColors();
  const smallScreen = useMediaQuery('(max-width: 600px)');

  return (
    <Box>

      <Box mb={'20px'}>
        <BaseNavLink to={`${routes.review}/${reviewId}`}>
          <Title variant={'h3'} title={title}/>
        </BaseNavLink>

        <Box display={'flex'} justifyContent={'space-between'} mt={'10px'}>
          <Title variant={'h4'} title={subtitle}/>
          <OverallScore
            overallScore={overallScore}
            isSmall={smallScreen}
          />
        </Box>
      </Box>

      <Box sx={{
        maxHeight: isHide ? '300px' : '100%',
        overflow: isHide ? 'hidden' : '',
        paddingBottom: '15px',
      }}>
        {body}
      </Box>

      {isHide && (
        <Box pt={'15px'}>
          <BaseNavLink
            to={`${routes.review}/${reviewId}`}
            color={colors.secondary.main}
          >
            <FormattedMessage id='app.review-body.see-more-button.title'/>
          </BaseNavLink>
        </Box>
      )}
    </Box>
  );
};
