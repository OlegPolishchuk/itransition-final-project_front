import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiTags} from "apis";
import {getTags} from "store/actions/reviews/getTags";
import {AxiosError} from "axios";

export const deleteTags = createAsyncThunk(
  'admin/deleteTags', async (tags: string[], {rejectWithValue, dispatch}) => {

    try {
      const queryString = tags
        .join(' ')
        .replaceAll(' ', '&id=')

      const res = await apiTags.deleteTags(queryString);

      if (res.status === 200 || res.status === 201 || res.status === 204) {
        dispatch(getTags());
      }

    } catch (e) {
      const err = e as AxiosError;

      return rejectWithValue(err.message)
    }

  }
)