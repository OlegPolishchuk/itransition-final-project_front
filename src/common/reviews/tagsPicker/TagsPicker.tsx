import React, {FC, useEffect, useState} from 'react';
import CreatableSelect from "react-select/creatable";
import {useAppSelector, useThemeColors} from "hooks";
import {selectTags, selectThemeMode} from "store/selectors";
import { StylesConfig } from 'react-select';

type Props = {
  handleChangeOptionCallback: (tags: string[]) => void;
}

type Option = {
  value: string;
  label: string;
}

export const TagsPicker: FC<Props> = ({handleChangeOptionCallback}) => {
  const tags = useAppSelector(selectTags);
  const theme = useAppSelector(selectThemeMode);

  const [value, setValue] = useState<Option | null>(null)
  const [options, setOptions] = useState<Option[]>([])

  const colors = useThemeColors();

  const handleChangeOption = (option: unknown) => {
    const value = option as Option;
    const values = option as Option[];
    const updatedTags = values.map(value => value.value);

    setValue(value)
    handleChangeOptionCallback(updatedTags);
  };

  const selectStyles: StylesConfig = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      backgroundColor: 'transparent',
      borderColor: state.isFocused ? colors.secondary.main : '',
      boxShadow: 'none',
      '&:hover': {
        borderColor: colors.secondary.main
      }
    }),
    menu: (baseStyles, state) => ({
      ...baseStyles,
      backgroundColor: theme === 'dark' ? colors.primary.second : '#fff',
    }),
    option: (baseStyles, {isSelected, isFocused}) => ({
      ...baseStyles,
     backgroundColor: isFocused
       ? theme === 'dark'
        ? colors.grey.main
         : colors.secondary.main
       : '',
      color: isFocused ? '#fff' : '',
    }),
    multiValue: (baseStyles) => ({
      ...baseStyles,
      border: '1px solid',
      borderColor: colors.secondary.second,
      backgroundColor: theme === 'dark' ? colors.grey.second : colors.grey.second,

    }),
    multiValueLabel: (baseStyles) => ({
      ...baseStyles,
      color: theme === 'dark' ? '#000' : '',
    }),
  }

  useEffect(() => {
    setOptions(tags.map(tag => ({value: tag, label: tag})))
  }, [tags])

  return (
    <CreatableSelect
      isMulti
      options={options}
      // className="basic-multi-select"
      classNamePrefix="select"
      isClearable
      value={value}
      onChange={handleChangeOption}
      styles={selectStyles}
    />
  );
};
