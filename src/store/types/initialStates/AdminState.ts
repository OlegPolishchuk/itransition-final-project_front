import {User} from "store/types/User/User";
import {TableSearchParams} from "store/types/usersTableSearchParams";

export type AdminState = {
  users: User[];
  isLoading: boolean;
  isGenerating: boolean;
  error: string;
  currentUser: User;
  totalCount: number;
  tableSearchParams: TableSearchParams;
}