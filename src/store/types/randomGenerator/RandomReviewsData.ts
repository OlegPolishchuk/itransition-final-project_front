import { Locale } from 'store/types';

export type RandomReviewsData = {
  reviewsCount: number | string | Array<number | string>;
  tags: string[];
  locale?: Locale;
};
