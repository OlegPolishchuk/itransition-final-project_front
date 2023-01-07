import { AuthData, instance } from 'apis';
import { apiRoutes } from 'shared';
import { SocialResponse, User } from 'store/types';

export const apiAuth = {
  register(data: AuthData) {
    return instance.post(apiRoutes.auth.register, data);
  },

  login(data: AuthData) {
    return instance.post<User>(apiRoutes.auth.login, data);
  },

  logout() {
    return instance.get(apiRoutes.auth.logout);
  },

  getProfile(token: string) {
    return instance.post<User>(apiRoutes.auth.profile, token);
  },

  refreshToken() {
    return instance.get(apiRoutes.auth.refresh);
  },

  socialLogin(data: SocialResponse) {
    return instance.post<User>(apiRoutes.auth.social, data);
  },

  githubLogin(code: string) {
    return instance.post<User>(apiRoutes.auth.github, { code });
  },
};
