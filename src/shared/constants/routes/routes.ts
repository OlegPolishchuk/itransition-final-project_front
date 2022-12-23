const baseAuthPath = '/api/auth';

export const routes = {
  auth: {
    register: `${baseAuthPath}/register`,
    login: `${baseAuthPath}/login`,
  },
  admin: {
    main: '/admin',
    user:'/admin/user',
    review: '/admin/review',
  },
  review: {
    base: '/review',
    addNew: '/addReview'
  },
  notFound: '/not-found',
  mainPage: {
    base: '/',
    popular: '/popular',
  },
  profile: {
    base: '/profile',
    myProfile: '/myProfile',
  },
  protectedRoute: '/protected'
}