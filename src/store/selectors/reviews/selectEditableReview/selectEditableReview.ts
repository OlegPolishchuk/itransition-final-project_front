import {RootState} from "store/store";

export const selectEditableReview = (state: RootState) => state.reviewsReducer.editableReview;