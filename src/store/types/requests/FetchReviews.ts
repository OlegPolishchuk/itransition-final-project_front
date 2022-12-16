import { SortReviews } from "../review";

export type FetchReviews = {
  sortReviews?: SortReviews;
  reviewId?: string;
  page?: number;
  limit?: number;
}
