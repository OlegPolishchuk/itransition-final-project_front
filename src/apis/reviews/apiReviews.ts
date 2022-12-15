import {instance} from "apis/instance/instance";
import {apiRoutes} from "shared";
import {GenerateRandomReviewsRequest} from "store/types/requests";
import {FetchReviewsResponse} from "store/types";

export const apiReviews = {
  getUsersReviews(userId: string, page: number, limit: number) {
    return instance.get<FetchReviewsResponse>(apiRoutes.reviews.userReviews, {
      params: {
        id: userId,
        page,
        limit
      }
    })
  },

  deleteReviews(queryString: string) {
    return instance.delete(`${apiRoutes.reviews.base}?id=${queryString}`)
  },

  generateRandomReviews(data: GenerateRandomReviewsRequest){
    return instance.post(apiRoutes.reviews.random, data)
  },

  getLatestReviews() {
    return instance.get<FetchReviewsResponse>(apiRoutes.reviews.latest)
  },

  getPopularReviews() {
    return instance.get<FetchReviewsResponse>(apiRoutes.reviews.popular)
  }
}