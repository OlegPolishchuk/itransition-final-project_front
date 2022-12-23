import {instance} from "apis/instance/instance";
import {apiRoutes} from "shared";
import {
  FetchReviews,
  FetchReviewsResponse,
  GenerateRandomReviewsRequest, Review, ReviewSortType
} from "store/types";


export const apiReviews = {
  getUsersReviews(userId: string, page: number, limit: number, sortType: ReviewSortType) {
    return instance.get<FetchReviewsResponse>(apiRoutes.reviews.userReviews, {
      params: {
        id: userId,
        page,
        limit,
        sortType,
      }
    })
  },

  deleteReviews(queryString: string) {
    return instance.delete(`${apiRoutes.reviews.base}?id=${queryString}`)
  },

  generateRandomReviews(data: GenerateRandomReviewsRequest) {
    return instance.post(apiRoutes.reviews.random, data)
  },

  getReviews(sortType: FetchReviews) {
    return instance.get<FetchReviewsResponse>(apiRoutes.reviews.base, {
      params: {...sortType}
    })
  },

  createNewReview(review: Partial<Review>) {
    return instance.post(apiRoutes.reviews.new, {review})
  },

  setReviewLike(reviewId: string, userId: string) {
    return instance.post<{review: Review}>(apiRoutes.reviews.like, {reviewId, userId})
  },

  setPersonalScore(reviewId: string, userId: string, score: number) {
    return instance.post<{review: Review}>(apiRoutes.reviews.score, {reviewId, userId, score})
  }

}