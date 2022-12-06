const baseAuthPath = '/api/auth';

export const routes = {
  auth: {
    register: `${baseAuthPath}/register`,
    login: `${baseAuthPath}/login`,
    refresh: `${baseAuthPath}/refresh`,
    profile: `${baseAuthPath}/getProfile`,
    logout: `${baseAuthPath}/logout`,
    google: `${baseAuthPath}/googleAuth`,
  },
  notFound: '/not-found',
  mainPage: '/',
  protectedRoute: '/protected'
}