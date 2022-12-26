import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiComments} from "apis/comments/apiComments";
import {setComments} from "store/reducers/commentsReducer/commentsSlice";

export const closeConnection = createAsyncThunk(
  'comments/closeConnection', (_, {rejectWithValue}) => {

    try {
      apiComments.destroyConnection();

      setComments([]);
    }
    catch (e) {
      return rejectWithValue(e as string)
    }

  }
)