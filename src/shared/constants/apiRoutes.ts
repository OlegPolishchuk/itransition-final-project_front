const baseAuthPath = '/api/auth';
export const apiRoutes = {
  auth: {
    register: `${baseAuthPath}/register`,
    login: `${baseAuthPath}/login`,
    refresh: `${baseAuthPath}/refresh`,
    profile: `${baseAuthPath}/getProfile`,
    logout: `${baseAuthPath}/logout`,
    social: `${baseAuthPath}/socialAuth`,
  },
  users: {
    base: '/users',
  },
  currentUser: {
    base: '/user'
  }
}