import {RootState} from "store/store";

export const selectAdminTableSearchParams = (state: RootState) =>
  state.adminReducer.tableSearchParams;