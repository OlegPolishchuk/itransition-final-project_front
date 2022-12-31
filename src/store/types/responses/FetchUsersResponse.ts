import { User } from 'store/types/User/User';

export type FetchUsersResponse = {
  users: User[];
  count: number;
};
