import { RootState } from 'store/store';

export const selectUploadedReviewImgSrc = (state: RootState): string =>
  state.reviewsReducer.uploadedImgSrc;
