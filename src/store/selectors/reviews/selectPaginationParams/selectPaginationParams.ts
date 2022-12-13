import {RootState} from "store/store";

export const selectPaginationParams = (state: RootState) => state.reviewsReducer.paginationParams;