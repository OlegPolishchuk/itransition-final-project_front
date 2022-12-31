import { RootState } from 'store/store';
import { User } from 'store/types';

export const selectAdminCurrentUser = (state: RootState): User =>
  state.adminReducer.currentUser;
