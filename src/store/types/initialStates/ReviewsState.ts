import {PaginationParams, Review, SortReviews} from "store/types";

export type ReviewsState = {
  reviews: Review[];
  tags: string[];
  sortType: SortReviews;
  error: string;
  paginationParams: PaginationParams;
  reviewCount: number;
  isLoading: boolean;
}