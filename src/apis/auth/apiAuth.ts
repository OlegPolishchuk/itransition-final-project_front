import {instance} from "apis/instance/instance";
import {AuthData} from "apis/auth/types";
import {routes} from "shared";

export const apiAuth = {
  register(data: AuthData) {
    return instance.post(routes.auth.register, data)
  },

  login(data: AuthData) {
    return instance.post(routes.auth.login, data)
  }
}