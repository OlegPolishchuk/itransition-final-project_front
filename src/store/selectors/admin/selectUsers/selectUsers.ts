import { RootState } from 'store/store';
import { User } from 'store/types';

export const selectUsers = (state: RootState): User[] => state.adminReducer.users;
