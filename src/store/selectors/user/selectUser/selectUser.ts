import { createSelector } from '@reduxjs/toolkit';

import { parseDate } from 'shared';
import { RootState } from 'store/store';
import { User } from 'store/types';

export const _selectUser = (state: RootState): User => state.userReducer.user;

export const selectUser = createSelector(_selectUser, user => ({
  ...user,
  created: parseDate(user.created),
}));
