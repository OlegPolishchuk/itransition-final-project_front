const baseAuthPath = '/api/auth';

export const routes = {
  auth: {
    register: `${baseAuthPath}/register`,
    login: `${baseAuthPath}/login`,
  },
  admin: {
    main: '/admin',
    user:'/admin/user'
  },
  notFound: '/not-found',
  mainPage: '/',
  protectedRoute: '/protected'
}