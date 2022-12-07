import {instance} from "apis/instance/instance";
import {apiRoutes} from "shared";
import {User} from "store/types/User";
import {UpdatedUsersStatusRequest} from "store/types/UpdatedUsersStatusRequest";

export const apiUsers = {
  fetchUsers(){
    return instance.get<User[]>(apiRoutes.users.base);
  },

  updateUsersStatus(users: UpdatedUsersStatusRequest[]) {
    return instance.put(apiRoutes.users.base, {
      users
    })
  },

  deleteUsers(queryString: string) {
    return instance.delete(`${apiRoutes.users.base}?id=${queryString}`)
  },
}