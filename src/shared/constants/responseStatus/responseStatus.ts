const okStatus = 200;
const createStatus = 201;
const noContentStatus = 204;

export const responseStatus = {
  unAuthorized: 401,
  goodStatus: okStatus || createStatus || noContentStatus,
};
