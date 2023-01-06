import { UserStatus } from 'shared';
import { Locale } from 'store/types';

export type RandomUserData = {
  usersCount: number | string | Array<number | string>;
  status: UserStatus;
  locale: Locale;
};
