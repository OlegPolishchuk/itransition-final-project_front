import {PaginationParams, Review} from "store/types";

export type ReviewsState = {
  reviews: Review[];
  tags: string[];
  paginationParams: PaginationParams;
  reviewCount: number;
}