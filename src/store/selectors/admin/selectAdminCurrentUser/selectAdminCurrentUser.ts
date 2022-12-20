import {RootState} from "store/store";

export const selectAdminCurrentUser = (state: RootState) => state.adminReducer.currentUser;