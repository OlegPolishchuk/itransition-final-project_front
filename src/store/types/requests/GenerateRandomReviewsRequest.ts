import { Locale } from 'store/types';

export type GenerateRandomReviewsRequest = {
  reviewsCount: number | string | Array<number | string>;
  tags: string[];
  locale: Locale;
  userId: string;
};
