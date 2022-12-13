import React, {memo, useState} from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox, CircularProgress, Divider,
  FormControlLabel,
  SelectChangeEvent
} from "@mui/material";
import {SliderGenerator} from "common/sliderGenerator/SliderGenerator";
import {UserStatusSwitcher} from "pages/adminPanel/createUserPanel/UserStatusSwitcher";
import {LocaleSelect} from "pages/adminPanel/createUserPanel/LocaleSelect";
import {FormattedMessage} from "react-intl";
import {locales, usersSliderValue, userStatus} from "shared";
import {Locale} from "store/types/AppState";
import {useAppDispatch, useAppSelector} from "hooks";
import {generateRandomUsers} from "store/actions/admin";
import {Title} from "common/title/Title";
import {RandomReviewsGenerator} from "common/reviews";
import {GenerateRandomData} from "store/types/GenerateRandomData";
import {selectIsGenerating} from "store/selectors";

export const CreateUserPanel = memo(() => {
  const dispatch = useAppDispatch();

  const isGenerating = useAppSelector(selectIsGenerating);

  const [generateRandomData, setGenerateRandomData] = useState<GenerateRandomData>({
    usersCount: 0,
    locale: locales.EN,
    status: userStatus.active,
    reviewsCount: 0,
    tags: [],
  })

  const [expanded, setExpanded] = useState(false);

  const handleUsersSliderChange = (event: Event, newValue: number | number[]) => {
    setGenerateRandomData(data => ({
      ...data,
      usersCount: newValue
    }))
  };

  const handleUsersSliderBlur = () => {
    if (generateRandomData.usersCount < usersSliderValue.MIN_SLIDER) {
      setGenerateRandomData(data => ({...data, usersCount: usersSliderValue.MIN_SLIDER}));
    } else if (generateRandomData.usersCount > usersSliderValue.MAX_SLIDER) {
      setGenerateRandomData(data => ({
        ...data,
        usersCount: usersSliderValue.MAX_SLIDER_INPUT
      }));
    }
  };

  const handleSliderInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGenerateRandomData(data => ({
      ...data,
      usersCount: event.target.value === '' ? '' : Number(event.target.value)
    }))
  };

  const handleChangeStatus = () => {
    setGenerateRandomData(data => ({
      ...data,
      status: generateRandomData.status === userStatus.active ? userStatus.blocked : userStatus.active
    }))
  }

  const handleChangeLocale = (event: SelectChangeEvent) => {
    setGenerateRandomData(data => ({
      ...data,
      locale: event.target.value as Locale
    }))
  }

  const handleGenerate = () => {
    dispatch(generateRandomUsers(generateRandomData));

    setGenerateRandomData({
        usersCount: 0,
        locale: locales.EN,
        status: userStatus.active,
        reviewsCount: 0,
        tags: [],
      }
    )

    setExpanded(false);
  }


  const handleToggleAccordion = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExpanded(event.target.checked);
  }


  return (
    <Box sx={{
      boxShadow: '1',
      padding: '20px 0',
      marginBottom: '30px',
    }}>

      <Box mb={'30px'} ml={'20px'}>
        <Title title={
          <FormattedMessage id={'app.admin.generate-users.title'}/>
        }/>
      </Box>

      <Accordion
        expanded={expanded}
        sx={{
          marginBottom: '30px',
          padding: '10px',
          backgroundColor: 'transparent'
        }}>

        <AccordionSummary sx={{padding: '10px 15px'}}>
          <Box className={'admin-controls-wrapper'}>

            <SliderGenerator
              sliderValue={usersSliderValue}
              itemsCount={generateRandomData.usersCount}
              handleSliderChange={handleUsersSliderChange}
              handleBlur={handleUsersSliderBlur}
              handleInputChange={handleSliderInputChange}
              title={<FormattedMessage id='app.admin.generate.slider-users.title'/>}
            />

            <UserStatusSwitcher
              status={generateRandomData.status}
              handleChangeStatus={handleChangeStatus}
            />

            <LocaleSelect
              locale={generateRandomData.locale}
              handleChangeLocale={handleChangeLocale}
            />

            <FormControlLabel
              control={(
                <Checkbox
                  checked={expanded}
                  onChange={handleToggleAccordion}
                  color="secondary"
                />
              )}
              label={(
                <FormattedMessage id={'app.admin.generate.checkbox-accordion.title'}/>
              )}/>

          </Box>


        </AccordionSummary>

        <Divider variant={'fullWidth'}/>

        <AccordionDetails sx={{marginTop: '20px'}}>
          <RandomReviewsGenerator
            data={generateRandomData}
            setDataCallback={setGenerateRandomData}
          />
        </AccordionDetails>

      </Accordion>


      <Box sx={{textAlign: 'center', position: 'relative'}}>
        <Button
          className={'button-generate-user'}
          variant={'contained'}
          color={'secondary'}
          onClick={handleGenerate}
          disabled={generateRandomData.usersCount === 0}
        >
          <FormattedMessage id='app.admin.generate.button.title'/>
        </Button>

        {isGenerating && (
          <CircularProgress
            size={24}
            sx={{
              color: '#fff',
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />
        )}
      </Box>

    </Box>
  );
});
