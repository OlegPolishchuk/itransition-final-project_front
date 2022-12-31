import { RootState } from 'store/store';
import { User } from 'store/types';

export const selectSelectedUser = (state: RootState): User =>
  state.userReducer.selectedUser;
