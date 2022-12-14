import {User} from "store/types/User/User";
import {localStorageData} from "shared";

export const localStorageService = {
  setAuthUserData(data: Partial<User>) {
    const token = data.token;
    const dataToLocalStorage = {
      token,
      userId: data._id,
      tokenStartTime: Date.now(),
    }

    localStorage.setItem(localStorageData.userData,JSON.stringify(dataToLocalStorage))
  },

  getItem(item: string){
    return JSON.parse(localStorage.getItem(item) as string)
  },

  setItem(title: string, data: any) {
    localStorage.setItem(title, JSON.stringify(data))
  },

  removeItem(title: string){
    localStorage.removeItem(title)
  }
}