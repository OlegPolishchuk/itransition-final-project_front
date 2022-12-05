import {RootState} from "store/store";

export const selectGlobalMessage = (state: RootState) => state.appReducer.globalMessage;