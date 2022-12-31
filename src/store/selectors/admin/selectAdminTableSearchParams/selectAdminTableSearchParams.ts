import { RootState } from 'store/store';
import { TableSearchParams } from 'store/types';

export const selectAdminTableSearchParams = (state: RootState): TableSearchParams =>
  state.adminReducer.tableSearchParams;
