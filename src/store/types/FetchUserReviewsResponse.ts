import {Review} from "store/types/Review";

export type FetchUserReviewsResponse = {
  reviews: Review[];
  totalCount: number;
}