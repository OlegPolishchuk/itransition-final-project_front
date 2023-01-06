import { UserRole, UserStatus } from 'shared';

export type User = {
  _id: string;
  login: string;
  userName: string;
  avatar: string;
  token: string;
  role: UserRole;
  status: UserStatus;
  created: string;
  lastLogin: string;
  reviewsCount: number;
  likes: number;
};
