import { UserRole } from 'shared';

export type User = {
  _id: string;
  login: string;
  userName: string;
  avatar: string;
  token: string;
  role: UserRole;
  status: string;
  created: string;
  lastLogin: string;
  reviewsCount: number;
  likes: number;
};

export type UserStatus = 'active' | 'blocked';
