import {Review} from "store/types";

export type FetchUserReviewsResponse = {
  reviews: Review[];
  totalCount: number;
}