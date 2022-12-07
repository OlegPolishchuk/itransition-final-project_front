import {User} from "store/types/User";

export type AdminState = {
  users: User[];
  isLoading: boolean;
  error: string;
}