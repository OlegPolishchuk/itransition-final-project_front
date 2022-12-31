import { localStorageService } from 'services';
import { localStorageData } from 'shared/constants';

export const getStartToken = (): string => {
  const storageData = localStorageService.getItem(localStorageData.userData);

  if (storageData) {
    return storageData.token;
  }

  return '';
};
