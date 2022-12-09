import {User} from "store/types/User";

export type FetchUsersResponse = {
  users: User[];
  count: number;
}