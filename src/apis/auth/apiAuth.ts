import {routes} from "shared";
import {User} from "store/types/User";
import {instance, AuthData} from "apis";
import {GoogleLoginData} from "store/types/GoogleResponse";

export const apiAuth = {
  register(data: AuthData) {
    return instance.post(routes.auth.register, data)
  },

  login(data: AuthData) {
    return instance.post<User>(routes.auth.login, data)
  },

  logout() {
    return instance.get(routes.auth.logout)
  },

  getProfile(token: string){
    return instance.post<User>(routes.auth.profile, token)
  },

  refreshToken() {
    return instance.get(routes.auth.refresh)
  },

  googleLogin(data: GoogleLoginData) {
    return instance.post<User>(routes.auth.google, data)
  }
}