import {RootState} from "store/store";

export const selectUserRole = (state: RootState) => state.userReducer.user.role;