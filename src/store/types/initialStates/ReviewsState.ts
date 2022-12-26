import {PaginationParams, Review, ReviewSortType} from "store/types";

export type ReviewsState = {
  reviews: Review[];
  editableReview: Review | null;
  tags: string[];
  error: string;
  isFirstLoading: boolean;
  paginationParams: PaginationParams;
  reviewCount: number;
  isLoading: boolean;
  sortType: ReviewSortType;
  uploadedImgSrc: string;
  isCreatedNewOne: boolean;
}

