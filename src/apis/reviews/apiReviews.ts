import {instance} from "apis/instance/instance";
import {apiRoutes} from "shared";

export const apiReviews = {
  getUsersReviews(userId: string, page: number, limit: number) {
    return instance.get(`${apiRoutes.reviews.base}${apiRoutes.reviews.userReviews}`, {
      params: {
        id: userId,
        page,
        limit
      }
    })
  },

  deleteReviews(queryString: string) {
    return instance.delete(`${apiRoutes.reviews.base}?id=${queryString}`)
  }
}