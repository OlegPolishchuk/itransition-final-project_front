import {RootState} from "store/store";

export const selectIsUserAuth = (state: RootState) => state.appReducer.isUserAuth;