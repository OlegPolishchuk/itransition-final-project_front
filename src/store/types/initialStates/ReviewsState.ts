import {PaginationParams, Review, ReviewSortType} from "store/types";

export type ReviewsState = {
  reviews: Review[];
  tags: string[];
  error: string;
  isFirstLoading: boolean;
  paginationParams: PaginationParams;
  reviewCount: number;
  isLoading: boolean;
  sortType: ReviewSortType;
}

