import {apiRoutes} from "shared";
import {User} from "store/types/User/User";
import {AuthData, instance} from "apis";
import {SocialResponse} from "store/types/responses/SocialResponse";

export const apiAuth = {
  register(data: AuthData) {
    return instance.post(apiRoutes.auth.register, data)
  },

  login(data: AuthData) {
    return instance.post<User>(apiRoutes.auth.login, data)
  },

  logout() {
    console.log('logout api')
    return instance.get(apiRoutes.auth.logout)
  },

  getProfile(token: string){
    return instance.post<User>(apiRoutes.auth.profile, token)
  },

  refreshToken() {
    return instance.get(apiRoutes.auth.refresh)
  },

  socialLogin(data: SocialResponse ) {
    console.log(`socialLogin api`)
    return instance.post<User>(apiRoutes.auth.social, data)
  }

}