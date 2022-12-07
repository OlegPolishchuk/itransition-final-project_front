export type User = {
  _id: string;
  login: string;
  token: string;
  role: UserRole;
  status: string;
  reviews: [];
}

export type UserRole = 'admin' | 'user';
export type UserRoles = {
  admin: UserRole;
  user: UserRole;
}