import {createAsyncThunk} from "@reduxjs/toolkit";
import {RootState} from "store/store";

export const getAccessToken = createAsyncThunk<string, void, {state: RootState}>(
  'auth/getAccessToken', (_,{getState}) => {

    const token = getState().authReducer.accessToken;

    return token

  }
)