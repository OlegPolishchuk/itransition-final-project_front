import { localStorageData } from 'shared/constants';
import { tokenData } from 'shared/constants/auth/tokenData';

const tokenExpiredTimeRatio = 1000;

export const isTokenExpired = (): boolean => {
  const expiredTime = tokenData.expireTime * tokenExpiredTimeRatio;
  const { tokenStartTime } = JSON.parse(
    localStorage.getItem(localStorageData.userData) as string,
  );

  return Date.now() > tokenStartTime + expiredTime * tokenData.refreshTimeRatio;
};
