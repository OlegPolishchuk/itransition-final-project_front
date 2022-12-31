import { ReviewSortType } from 'store/types';

export const getPathname = (pathname: string): ReviewSortType => {
  return pathname.split('/').reverse()[0] as ReviewSortType;
};
