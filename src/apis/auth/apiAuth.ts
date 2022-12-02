import {instance} from "apis/instance/instance";
import {authUrl} from "shared/utils/authUrl";
import {AuthData} from "apis/auth/types";

export const apiAuth = {
  register(data: AuthData) {
    return instance.post(authUrl.register, data)
  },

  login(data: AuthData) {
    return instance.post(authUrl.login, data)
  }
}