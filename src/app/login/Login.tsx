import React, {FormEvent, useState} from 'react';
import axios from "axios";
import {Box, Button, Paper, TextField} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
}

export const Login = () => {

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors}
  } = useForm<Inputs>({mode: 'onBlur'});

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data)
  }

  return (
    <Box className={'authContainer'}>

      <Paper>

        <form onSubmit={handleSubmit(onSubmit)} className={'wrapper'}>

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

          <Button
            color={'secondary'}
            type={'submit'}
            variant={'outlined'}
          >
            Sign Up
          </Button>

        </form>

      </Paper>

    </Box>
  );
};
