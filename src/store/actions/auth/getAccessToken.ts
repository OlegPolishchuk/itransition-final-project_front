import {createAsyncThunk} from "@reduxjs/toolkit";
import {RootState} from "store/store";

export const getAccessToken = createAsyncThunk<string, void, {state: RootState}>(
  'auth/getAccessToken', (_,{getState}) => {

    return getState().authReducer.accessToken;
  }
)