import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { apiTags } from 'apis';
import { responseStatus } from 'shared';
import { getTags } from 'store/actions';

export const deleteTags = createAsyncThunk(
  'admin/deleteTags',
  async (tags: string[], { rejectWithValue, dispatch }) => {
    try {
      const queryString = tags.join(' ').replaceAll(' ', '&id=');

      const res = await apiTags.deleteTags(queryString);

      if (res.status === responseStatus.noContent) {
        dispatch(getTags());
      }
    } catch (e) {
      const err = e as AxiosError;

      return rejectWithValue(err.message);
    }
  },
);
