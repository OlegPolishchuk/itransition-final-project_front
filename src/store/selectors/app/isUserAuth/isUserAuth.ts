import {RootState} from "store/store";

export const isUserAuth = (state: RootState) => state.appReducer.isUserAuth;