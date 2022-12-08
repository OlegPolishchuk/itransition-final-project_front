import React from 'react';
import {Box, Button} from "@mui/material";
import {CreateUserSlider} from "common/users/createUserPanel/CreateUserSlider";
import {UserStatusSwitcher} from "common/users/createUserPanel/UserStatusSwitcher";
import {LocaleSelect} from "common/users/createUserPanel/LocaleSelect";
import {FormattedMessage} from "react-intl";

export const CreateUserPanel = () => {
  return (
    <Box sx={{
      boxShadow: '1',
      padding: '20px',
      marginBottom: '30px',
    }}>

      <Box className={'admin-controls-wrapper'}>

        <CreateUserSlider />
        <UserStatusSwitcher />
        <LocaleSelect />

        <Button
          className={'button-generate-user'}
          variant={'contained'}
          color={'secondary'}
        >
          <FormattedMessage id='app.admin.generate.button.title' />
        </Button>

      </Box>

    </Box>
  );
};
