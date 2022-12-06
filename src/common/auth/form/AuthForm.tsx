import React, {FC, ReactNode} from 'react';
import {Box, Button, TextField} from "@mui/material";
import {useForm} from "react-hook-form";
import {emailRegexp} from "shared";
import {useAppSelector} from "hooks";
import {selectGlobalMessage} from "store/selectors/app";

type Inputs = {
  email: string;
  password: string;
}

type Props = {
  submitCallback: (data: Inputs) => void;
  children?: ReactNode;
  buttonTitle: string;
}

export const AuthForm: FC<Props> = ({submitCallback, children, buttonTitle }) => {
  const globalMessage = useAppSelector(selectGlobalMessage);

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<Inputs>({mode: 'onSubmit'});

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
        helperText={errors.email && errors.email.message}
      />

      <TextField
        label={'Password'}
        type={'password'}
        {...register('password', {
          required: true,
          minLength: {
            value: 6,
            message: 'Min length is 6 char',
          }
        })}
        error={!!errors.password}
        helperText={errors.password && (errors.password.message || 'Required')}
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
