import {RootState} from "store/store";

export const selectIsUsersLoading = (state: RootState) => state.adminReducer.isLoading;