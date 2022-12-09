import {User} from "store/types/User";
import {userRoles} from "shared/constants";

export const addCheckboxToUser = (users: User[]) => {
  return users.map(user => (
    // user.role === userRoles.admin ? user : {...user, checked: false }
    {...user, checked: false }
  ))
}