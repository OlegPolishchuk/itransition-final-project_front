import {ReviewSortType} from "store/types/reviewsSortParams";

export type FetchReviews = {
  reviewsSortParams?: ReviewSortType;
  reviewId?: string;
  page?: number;
  limit?: number;
}
