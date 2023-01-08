import { ChangeEvent, useCallback } from 'react';

type Props<T, K> = {
  setState: (state: T) => void;
  fieldName: keyof T & keyof K;
  setError: (error: K) => void;
};

export const useUpdateField = <T extends object, K extends object>({
  setState,
  setError,
  fieldName,
}: Props<T, K>): ((e: ChangeEvent<HTMLInputElement>) => void) => {
  return useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      setState(((prevState: T) => ({ ...prevState, [fieldName]: e.target.value })) as T);

      setError(((prevError: K) => ({ ...prevError, [fieldName]: false })) as K);
    },
    [fieldName],
  );
};
