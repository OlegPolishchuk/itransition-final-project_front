export const routes = {
  auth: {
    register: '/api/auth/register',
    login: '/api/auth/login',
  },
  admin: {
    main: '/admin',
    user: '/admin/user',
    review: '/admin/review',
    tags: '/admin/tags',
  },
  review: {
    base: '/review',
    addNew: '/review/addReview',
    edit: '/review/editReview',
  },
  notFound: '/not-found',
  mainPage: {
    base: '/',
    popular: '/likes',
    scored: '/overallScore',
    search: '/search',
  },
  profile: {
    base: '/profile',
    myProfile: '/myProfile',
  },
  tags: {
    base: '/tags',
  },
};
