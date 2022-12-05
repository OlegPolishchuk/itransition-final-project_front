export type User = {
  _id: string;
  email: string;
  token: string;
  role: UserRole;
  reviews: [];
}

export type UserRole = 'admin' | 'user'