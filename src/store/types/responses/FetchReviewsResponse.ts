import {Review} from "store/types/review";

export type FetchReviewsResponse = {
  totalCount: number;
  reviews: Review[];
}