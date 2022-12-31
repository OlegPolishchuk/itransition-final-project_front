import { instance } from 'apis/instance/instance';
import { apiRoutes } from 'shared';

export const apiTags = {
  getTags() {
    return instance.get(apiRoutes.tags.base);
  },

  deleteTags(queryString: string) {
    return instance.delete(`${apiRoutes.tags.base}?id=${queryString}`);
  },
};
