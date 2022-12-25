import {RootState} from "store/store";

export const selectIsCreatedNewReview = (state: RootState) => state.reviewsReducer.isCreatedNewOne;