import { createSelector } from '@reduxjs/toolkit';

import { UserRole } from 'shared';
import { RootState } from 'store/store';
import { User } from 'store/types';

const selectUsers = (state: RootState): User[] => state.adminReducer.users;

export const selectUsersWithoutAdmin = createSelector(selectUsers, users => {
  return users.filter(user => user.role !== UserRole.Admin);
});
