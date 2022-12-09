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
  reviews: [];
}

export type UserRole = 'admin' | 'user';
export type UserRoles = {
  admin: UserRole;
  user: UserRole;
}