import React, {memo, useState} from 'react';
import {Box, Button, SelectChangeEvent} from "@mui/material";
import {CreateUserSlider} from "common/users/createUserPanel/CreateUserSlider";
import {UserStatusSwitcher} from "common/users/createUserPanel/UserStatusSwitcher";
import {LocaleSelect} from "common/users/createUserPanel/LocaleSelect";
import {FormattedMessage} from "react-intl";
import {locales, sliderValue, userStatus} from "shared";
import {GenerateRandomUserData} from "store/types/GenerateRandomUserData";
import {Locale} from "store/types/AppState";
import {useAppDispatch} from "hooks";
import {generateRandomUsers} from "store/actions/users";

export const CreateUserPanel = memo( () => {
  const dispatch = useAppDispatch();

  const [usersCount, setUsersCount] = useState<number | string | Array<number | string>>(0);
  const [status, setStatus] = useState(userStatus.active);
  const [locale, setLocale] = useState(locales.EN);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setUsersCount(newValue);
  };

  const handleSliderBlur = () => {
    if (usersCount < 0) {
      setUsersCount(0);
    } else if (usersCount > 100) {
      setUsersCount(100);
    }
  };

  const handleSliderInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsersCount(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleChangeStatus = () => {
    setStatus((prevState => prevState === userStatus.active ? userStatus.blocked : userStatus.active))
  }

  const handleChangeLocale = (event: SelectChangeEvent) => {
    setLocale(event.target.value as string);
  }

  const handleGenerate = () => {
    const data: GenerateRandomUserData = {
      count: usersCount as number,
      locale: locale as Locale,
      status,
    }

    dispatch(generateRandomUsers(data));
  }


  return (
    <Box sx={{
      boxShadow: '1',
      padding: '20px',
      marginBottom: '30px',
    }}>

      <Box className={'admin-controls-wrapper'}>

        <CreateUserSlider
          sliderValue={sliderValue}
          usersCount={usersCount}
          handleSliderChange={handleSliderChange}
          handleBlur={handleSliderBlur}
          handleInputChange={handleSliderInputChange}
        />

        <UserStatusSwitcher
          status={status}
          handleChangeStatus={handleChangeStatus}
        />

        <LocaleSelect
          locale={locale}
          handleChangeLocale={handleChangeLocale}
        />

        <Button
          className={'button-generate-user'}
          variant={'contained'}
          color={'secondary'}
          onClick={handleGenerate}
        >
          <FormattedMessage id='app.admin.generate.button.title' />
        </Button>

      </Box>

    </Box>
  );
});
