import { Locale } from 'store/types';
import { UserStatus } from 'store/types/User/User';

export type RandomUserData = {
  usersCount: number | string | Array<number | string>;
  status: UserStatus;
  locale: Locale;
};
