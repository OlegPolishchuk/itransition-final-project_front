import {instance} from "apis/instance/instance";
import {apiRoutes} from "shared";
import {UpdatedUsersStatusRequest} from "store/types/requests/UpdatedUsersStatusRequest";
import {FetchUsersResponse} from "store/types/responses/FetchUsersResponse";
import {User} from "store/types/User/User";
import {RandomUserData} from "store/types/randomGenerator/RandomUserData";

export const apiUsers = {
  fetchUsers(page: number, limit: number){
    return instance.get<FetchUsersResponse>(`${apiRoutes.users.base}?page=${page}&limit=${limit}`);
  },

  updateUsersStatus(users: UpdatedUsersStatusRequest[]) {
    return instance.put(apiRoutes.users.base, {
      users
    })
  },

  deleteUsers(queryString: string) {
    return instance.delete(`${apiRoutes.users.base}?id=${queryString}`)
  },

  fetchCurrentUser(userId: string){
    return instance.get(`${apiRoutes.currentUser.base}?id=${userId}`)
  },

  generateRandomUsers(data: RandomUserData) {
    return instance.post(apiRoutes.users.base, {data})
  },

  updateCurrentUser(user: Partial<User>) {
    return instance.put(apiRoutes.currentUser.base, {user})
  }
}