import {User} from "store/types";

export type UserState = {
  user: User;
  selectedUser: User;
  isLoading: boolean;
}