import React, {useState} from 'react';
import {Box, Stack, Switch, Typography} from "@mui/material";
import {userStatus} from "shared";
import {FormattedMessage} from "react-intl";
import {useAppSelector, useThemeColors} from "hooks";

export const UserStatusSwitcher = () => {
  const [status, setStatus] = useState(userStatus.active);

  const colors = useThemeColors();

  const handleChangeStatus = () => {
    setStatus((prevState => prevState === userStatus.active ? userStatus.blocked : userStatus.active))
  }

  return (
    <Box className={'status-switcher-wrapper'}>
      <Typography id="input-slider" gutterBottom>
        <FormattedMessage id='app.admin.generate.switcher.title' />
      </Typography>

      <Box className={'status-switcher'}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography color={status === userStatus.blocked ? colors.grey.main : ''}>
            <FormattedMessage id='app.admin.generate.switcher-blocked.title' />
          </Typography>

          <Switch
            color={'secondary'}
            size={'medium'}
            checked={status === userStatus.active}
            onChange={handleChangeStatus}
            inputProps={{ 'aria-label': 'controlled' }}
          />

          <Typography color={status === userStatus.active ? colors.secondary.main : ''}>
            <FormattedMessage id='app.admin.generate.switcher-active.title' />
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};
