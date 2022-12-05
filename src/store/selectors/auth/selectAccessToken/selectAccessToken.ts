import {RootState} from "store/store";

export const selectAccessToken = (state: RootState) => state.authReducer.accessToken;