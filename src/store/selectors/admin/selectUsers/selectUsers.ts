import {RootState} from "store/store";

export const selectUsers = (state: RootState) => state.adminReducer.users;