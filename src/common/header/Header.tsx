import React, {FC} from 'react';
import {Container} from "@mui/material";
import {useAppDispatch} from "hooks";
import {ThemeMode} from "store/reducers/appReducer/types/initialState";
import {toggleTheme} from "store/reducers/appReducer/AppSlice";
import {ThemeToggle} from "common/header/themeToggle/ThemeToggle";

type Props = {
  themeMode: ThemeMode;
}

export const Header: FC<Props> = ({themeMode}) => {
  const dispatch = useAppDispatch();

  const handleChangeTheme = () => {
    dispatch(toggleTheme())
  }

  return (
    <header>
      <Container sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '10px 0',
      }}>

        <ThemeToggle themeMode={themeMode} callback={handleChangeTheme} />

      </Container>
    </header>
  );
};
