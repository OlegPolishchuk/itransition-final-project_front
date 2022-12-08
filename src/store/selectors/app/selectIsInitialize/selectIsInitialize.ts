import {RootState} from "store/store";

export const selectIsInitialize = (state: RootState) => state.appReducer.isInitialize;