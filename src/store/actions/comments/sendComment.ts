import {createAsyncThunk} from "@reduxjs/toolkit";
import {Comment} from "store/types";
import {apiComments} from "apis/comments/apiComments";

export const sendComment = createAsyncThunk(
  'comments/sendComment' ,
  (comment: Comment) => {

    apiComments.sendComment(comment)
  }
)