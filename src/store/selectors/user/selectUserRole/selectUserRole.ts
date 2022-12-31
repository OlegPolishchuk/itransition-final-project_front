import { RootState } from 'store/store';
import { UserRole } from 'store/types';

export const selectUserRole = (state: RootState): UserRole => state.userReducer.user.role;
