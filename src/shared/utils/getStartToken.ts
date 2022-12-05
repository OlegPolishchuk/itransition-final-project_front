import {localStorageData} from "shared/constants";

export const getStartToken = () => {
  const storageData = JSON.parse(localStorage.getItem(localStorageData.userData) as string)

  if (storageData) {
    return storageData.type
  }

  return '';
}