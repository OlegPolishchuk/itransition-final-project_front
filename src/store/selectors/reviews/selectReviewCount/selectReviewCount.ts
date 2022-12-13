import {RootState} from "store/store";

export const selectReviewCount = (state: RootState) => state.reviewsReducer.reviewCount;