import {User} from "store/types/User";
import {Review} from "store/types/Review";

export type FetchUserResponse = {
  user: User;
  reviews: Review[];
}