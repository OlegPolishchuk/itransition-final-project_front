import {localStorageData} from "shared/constants";
import {localStorageService} from "services";

export const getStartToken = () => {
  const storageData = localStorageService.getItem(localStorageData.userData);

  if (storageData) {
    return storageData.token
  }

  return '';
}