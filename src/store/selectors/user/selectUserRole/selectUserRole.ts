import { UserRole } from 'shared';
import { RootState } from 'store/store';

export const selectUserRole = (state: RootState): UserRole => state.userReducer.user.role;
