import {instance} from "apis/instance/instance";
import {apiRoutes} from "shared";

export const apiReviews = {
  getUsersReviews(userId: string) {
    return instance.get(`${apiRoutes.reviews.base}${apiRoutes.reviews.userReviews}?id=${userId}`)
  }
}