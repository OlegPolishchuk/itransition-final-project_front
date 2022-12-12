import {RootState} from "store/store";

export const selectReviews = (state: RootState) => state.reviewsReducer.reviews
