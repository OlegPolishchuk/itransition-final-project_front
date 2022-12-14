import {User} from "store/types";

export type UserState = {
  user: User;
  isLoading: boolean;
}