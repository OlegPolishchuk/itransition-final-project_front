import {instance} from "apis/instance/instance";
import {apiRoutes} from "shared";
import {UpdatedUsersStatusRequest} from "store/types/UpdatedUsersStatusRequest";
import {GenerateRandomUserData} from "store/types/GenerateRandomUserData";
import {FetchUsersResponse} from "store/types/FetchUsersResponse";

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

  generateRandomUsers(data: GenerateRandomUserData) {
    return instance.post(apiRoutes.users.base, data)
  },
}