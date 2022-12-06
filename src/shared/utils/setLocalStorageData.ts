import {localStorageData} from "shared/constants";
import {User} from "store/types/User";

export const setLocalStorageData = (data: User) => {
  const token = data.token;

  const dataToLocalStorage = {
    token,
    userId: data._id,
    tokenStartTime: Date.now(),
  }

  localStorage.setItem(localStorageData.userData,JSON.stringify(dataToLocalStorage))
}