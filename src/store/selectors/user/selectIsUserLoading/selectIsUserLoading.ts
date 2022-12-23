import {RootState} from "store/store";

export const selectIsUserLoading = (state: RootState) => state.userReducer.isLoading;