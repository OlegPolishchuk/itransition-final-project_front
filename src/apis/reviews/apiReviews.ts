import {instance} from "apis/instance/instance";
import {apiRoutes} from "shared";
import {
  FetchReviews,
  FetchReviewsResponse,
  GenerateRandomReviewsRequest, ReviewSortType
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

}