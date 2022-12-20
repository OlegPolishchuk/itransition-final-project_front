import {RootState} from "store/store";

export const selectIsFirstLoading = (state: RootState) => state.reviewsReducer.isFirstLoading;