export const routes = {
  auth: {
    register: '/api/auth/register',
    login: '/api/auth/login',
  },
  admin: {
    main: '/admin',
    user:'/admin/user',
    review: '/admin/review',
    tags: '/admin/tags',
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