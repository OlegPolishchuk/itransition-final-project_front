import {UserStatus} from "store/types/User";
import {Locale} from "store/types/AppState";

export type GenerateRandomData = {
  usersCount: number | string | Array<number | string>;
  status: UserStatus;
  locale: Locale;
  reviewsCount: number | string | Array<number | string>;
  tags: string[];
}