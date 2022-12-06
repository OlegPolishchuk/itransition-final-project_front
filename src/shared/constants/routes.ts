const baseAuthPath = '/api/auth';

export const routes = {
  auth: {
    register: `${baseAuthPath}/register`,
    login: `${baseAuthPath}/login`,
    refresh: `${baseAuthPath}/refresh`,
    profile: `${baseAuthPath}/getProfile`,
    logout: `${baseAuthPath}/logout`,
    social: `${baseAuthPath}/socialAuth`,
  },
  notFound: '/not-found',
  mainPage: '/',
  protectedRoute: '/protected'
}