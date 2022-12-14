import {instance} from "apis/instance/instance";
import {apiRoutes} from "shared";
import {GenerateRandomReviewsRequest} from "store/types/requests";

export const apiReviews = {
  getUsersReviews(userId: string, page: number, limit: number) {
    return instance.get(apiRoutes.reviews.userReviews, {
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
  }
}