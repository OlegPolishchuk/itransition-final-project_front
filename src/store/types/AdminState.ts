import {User} from "store/types/User";

export type AdminState = {
  users: User[];
  isLoading: boolean;
  isGenerating: boolean;
  error: string;
  currentUser: User;
  totalCount: number;
  tableSearchParams: TableSearchParams;
}

export type TableSearchParams = {
  page: number;
  limit: number;
}