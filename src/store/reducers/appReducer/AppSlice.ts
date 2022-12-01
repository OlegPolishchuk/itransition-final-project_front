import {createSlice} from "@reduxjs/toolkit";
import {InitialState} from "store/reducers/appReducer/types/initialState";


const initialState: InitialState = {
  error: '',
  isLoading: false,
  review: [],
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
})


export const appReducer = appSlice.reducer;