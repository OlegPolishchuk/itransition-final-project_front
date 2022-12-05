import axios, {AxiosError} from "axios";
import {localStorageData, routes} from "shared";
import {logoutUser} from "store/actions";
import {isTokenExpired} from "shared/utils/isTokenExpired";
import {ToolkitStore} from "@reduxjs/toolkit/dist/configureStore";
import {AnyAction, CombinedState, ThunkMiddleware} from "@reduxjs/toolkit";
import {UserState} from "store/types/UserState";
import {AuthState} from "store/types/AuthState";
import {AppState} from "store/types/AppState";
import {refreshToken} from "store/actions/refreshToken";


const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';
const PUBLIC_ROUTES = [
  // routes.mainPage,
  routes.notFound,
  routes.auth.login,
  routes.auth.logout,
  routes.auth.register,
  routes.auth.refresh,
]

let store:  ToolkitStore<CombinedState<{appReducer: AppState, authReducer: AuthState, userReducer: UserState}>, AnyAction, [ThunkMiddleware<CombinedState<{appReducer: AppState, authReducer: AuthState, userReducer: UserState}>, AnyAction, undefined>]>;
export const injectStore = (_store: any) => {
  store = _store
}

export const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
})

instance.interceptors.request.use(async (config) => {
  if (config.url && PUBLIC_ROUTES.includes(config.url)) {
    return config
  }

  const {token} = await JSON.parse(localStorage.getItem(localStorageData.userData) as string)
  const isUserAuth = store.getState().authReducer.isUserAuth;

  if (token) {
    const authorization = `Bearer ${token}`;


    config.headers = {
      ...config.headers,
      authorization,
    }
  }

  if (isTokenExpired() && isUserAuth) {
    store.dispatch(refreshToken());
  }

  return config
})

instance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const isUserAuth = store.getState().authReducer.isUserAuth;
    if ((error.response?.status === 401) && isUserAuth && error.request.url !== routes.auth.logout) {
      store.dispatch(logoutUser())
    }

    throw error
  }
)


