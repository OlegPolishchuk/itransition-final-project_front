import {RootState} from "store/store";

export const selectUploadedReviewImgSrc = (state: RootState) => state.reviewsReducer.uploadedImgSrc;