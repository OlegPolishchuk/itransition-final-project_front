import { createSelector } from '@reduxjs/toolkit';

import { parseDate } from 'shared';
import { RootState } from 'store/store';
import { User } from 'store/types';

const _selectSelectedUser = (state: RootState): User => state.userReducer.selectedUser;

export const selectSelectedUser = createSelector(_selectSelectedUser, user => {
  return {
    ...user,
    created: parseDate(user.created),
  };
});
