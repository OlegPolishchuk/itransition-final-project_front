import {RootState} from "store/store";

export const selectReviewsSortType = (state: RootState) => state.reviewsReducer.sortType;