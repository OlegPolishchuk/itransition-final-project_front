import React, { FC } from 'react';

import { Box, Stack, Switch, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { useThemeColors } from 'hooks';
import { userStatus } from 'shared';

type Props = {
  status: string;
  handleChangeStatus: () => void;
};

export const UserStatusSwitcher: FC<Props> = ({ status, handleChangeStatus }) => {
  const colors = useThemeColors();

  return (
    <Box className="status-switcher-wrapper">
      <Typography id="input-slider" gutterBottom>
        <FormattedMessage id="app.admin.generate.switcher.title" />
      </Typography>

      <Box className="status-switcher">
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography color={status === userStatus.blocked ? colors.grey.main : ''}>
            <FormattedMessage id="app.admin.generate.switcher-blocked.title" />
          </Typography>

          <Switch
            color="secondary"
            size="medium"
            checked={status === userStatus.active}
            onChange={handleChangeStatus}
            inputProps={{ 'aria-label': 'controlled' }}
          />

          <Typography color={status === userStatus.active ? colors.secondary.main : ''}>
            <FormattedMessage id="app.admin.generate.switcher-active.title" />
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};
