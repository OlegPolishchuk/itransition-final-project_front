import {RootState} from "store/store";

export const selectReviewSortType = (state: RootState) => state.reviewsReducer.sortType;