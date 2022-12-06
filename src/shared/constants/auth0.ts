import {routes} from "shared/constants/routes";

export const auth0 = {
  domain: process.env.REACT_APP_AUTH0_DOMAIN as string,
  clientId: process.env.REACT_APP_AUTH0_CLIENT_ID as string,
  redirectUri: `http://localhost:3000${routes.auth.login}`,
}