import {RootState} from "store/store";

export const selectTotalCount = (state: RootState) => state.adminReducer.totalCount;