import {RootState} from "store/store";

export const selectSelectedUser = (state: RootState) => state.userReducer.selectedUser;