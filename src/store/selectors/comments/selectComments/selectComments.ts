import {RootState} from "store/store";

export const selectComments = (state: RootState) => state.commentsReducer.comments;