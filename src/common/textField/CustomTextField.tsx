import React, { ReactElement } from 'react';

import { TextField } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { useUpdateField } from 'hooks';

type Props<T, K> = {
  state: T;
  setState: (state: T) => void;
  fieldName: keyof T & keyof K;
  error: K;
  setError: (error: K) => void;
};

export const CustomTextField = <T extends object, K extends object>({
  fieldName,
  state,
  setState,
  error,
  setError,
}: Props<T, K>): ReactElement => {
  const handleChangeTitle = useUpdateField({ setState, setError, fieldName });

  return (
    <TextField
      label={<FormattedMessage id="app.user.add-new-review.field-title.title" />}
      variant="outlined"
      value={state[fieldName] as keyof T}
      onChange={handleChangeTitle}
      size="small"
      required
      error={error[fieldName] as boolean}
      helperText={error[fieldName] ? 'Required' : ''}
    />
  );
};
