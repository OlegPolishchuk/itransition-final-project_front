import {createAsyncThunk} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {apiTags} from "apis";

export const getTags = createAsyncThunk(
  'reviews/getTags', async (_, {rejectWithValue}) => {
    try {
      const res = await apiTags.getTags();

      return res.data;
    }
    catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.message)
    }
  }
)