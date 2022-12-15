import {PaginationParams, Review} from "store/types";

export type ReviewsState = {
  reviews: Review[];
  tags: string[];
  error: string;
  paginationParams: PaginationParams;
  reviewCount: number;
  isLoading: boolean;
}