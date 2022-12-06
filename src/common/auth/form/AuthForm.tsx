import React, {FC, ReactNode} from 'react';
import {Box, Button, TextField} from "@mui/material";
import {useForm} from "react-hook-form";
import {emailRegexp} from "shared";
import {useAppSelector} from "hooks";
import {selectGlobalMessage} from "store/selectors/app";
import {FormattedMessage} from "react-intl";

type Inputs = {
  email: string;
  password: string;
}

type Props = {
  submitCallback: (data: Inputs) => void;
  children?: ReactNode;
  buttonTitle: React.ReactElement;
}

export const AuthForm: FC<Props> = ({submitCallback, children, buttonTitle }) => {
  const globalMessage = useAppSelector(selectGlobalMessage);

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<Inputs>({mode: 'onSubmit'});

  const passErrorMessageLength = <FormattedMessage id='app.auth-form.input-password.error-length'/>
  const loginErrorMessage = <FormattedMessage id='app.auth-form.input-login.error'/>

  return (
    <form onSubmit={handleSubmit(submitCallback)} className={'wrapper'}>

      <TextField
        label={'Email'}
        {...register('email', {
          required: true,
          pattern: {
            value: emailRegexp,
            message: 'Invalid email',
          }
        })}
        error={!!errors.email}
        helperText={errors.email && loginErrorMessage}
      />

      <TextField
        label={'Password'}
        type={'password'}
        {...register('password', {
          required: true,
          minLength: 6,
        })}
        error={!!errors.password}
        helperText={errors.password && (passErrorMessageLength)}
      />

      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
      }}>

        <Button
          color={'secondary'}
          type={'submit'}
          variant={'outlined'}
          disabled={!!globalMessage}
        >
          {buttonTitle}
        </Button>

        {children && children}

      </Box>

    </form>
  );
};
