import React, { memo, ReactElement } from 'react';

import { Box, Stack, Switch, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { useThemeColors } from 'hooks';
import { UserStatus } from 'shared';

type Props = {
  status: string;
  handleChangeStatus: () => void;
};

export const UserStatusSwitcher = memo(
  ({ status, handleChangeStatus }: Props): ReactElement => {
    const colors = useThemeColors();

    return (
      <Box className="status-switcher-wrapper">
        <Typography id="input-slider" gutterBottom>
          <FormattedMessage id="app.admin.generate.switcher.title" />
        </Typography>

        <Box className="status-switcher">
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography color={status === UserStatus.Blocked ? colors.grey.main : ''}>
              <FormattedMessage id="app.admin.generate.switcher-blocked.title" />
            </Typography>

            <Switch
              color="secondary"
              size="medium"
              checked={status === UserStatus.Active}
              onChange={handleChangeStatus}
              inputProps={{ 'aria-label': 'controlled' }}
            />

            <Typography color={status === UserStatus.Active ? colors.secondary.main : ''}>
              <FormattedMessage id="app.admin.generate.switcher-active.title" />
            </Typography>
          </Stack>
        </Box>
      </Box>
    );
  },
);
