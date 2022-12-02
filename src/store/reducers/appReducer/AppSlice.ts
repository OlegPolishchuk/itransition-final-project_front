import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {InitialState, ThemeMode} from "store/reducers/appReducer/types/initialState";


const initialState: InitialState = {
  error: '',
  isLoading: false,
  review: [],
  themeMode: 'light',
  isUserAuth: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.themeMode = state.themeMode === 'light' ? 'dark' : 'light';
    }
  },
})


export const appReducer = appSlice.reducer;
export const {toggleTheme} = appSlice.actions;