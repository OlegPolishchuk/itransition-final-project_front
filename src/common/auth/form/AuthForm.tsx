import React, {FC, ReactNode} from 'react';
import {Box, Button, TextField} from "@mui/material";
import {useForm} from "react-hook-form";

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

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors}
  } = useForm<Inputs>({mode: 'onBlur'});

  return (
    <form onSubmit={handleSubmit(submitCallback)} className={'wrapper'}>

      <TextField
        label={'Email'}
        {...register('email', {
          required: true
        })}
        error={!!errors.email}
        helperText={errors.email && <span>Incorrect email</span>}
      />

      <TextField
        label={'Password'}
        {...register('password', {
          required: true,
          minLength: {
            value: 6,
            message: 'Min length is 6 char'
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
        >
          {buttonTitle}
        </Button>

        {children && children}

      </Box>

    </form>
  );
};
