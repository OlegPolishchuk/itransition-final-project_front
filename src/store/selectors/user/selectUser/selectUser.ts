import { RootState } from 'store/store';
import { User } from 'store/types';

export const selectUser = (state: RootState): User => state.userReducer.user;
