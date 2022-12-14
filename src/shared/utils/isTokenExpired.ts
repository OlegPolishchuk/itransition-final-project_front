import {tokenData} from "shared/constants/auth/tokenData";
import {localStorageData} from "shared/constants";

export const isTokenExpired = () => {
  const expiredTime = tokenData.expireTime * 1000;
  const {tokenStartTime} = JSON.parse(localStorage.getItem(localStorageData.userData) as string);

  return Date.now() > tokenStartTime  + (expiredTime * tokenData.refreshTimeRatio);
}