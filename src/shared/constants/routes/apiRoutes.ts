const baseAuthPath = '/api/auth';
const baseReviewsPath = '/reviews';
const baseTagsPath = '/tags';
const baseUsersPath = '/users';
const baseUserPath = '/user';

export const apiRoutes = {
  auth: {
    register: `${baseAuthPath}/register`,
    login: `${baseAuthPath}/login`,
    refresh: `${baseAuthPath}/refresh`,
    profile: `${baseAuthPath}/getProfile`,
    logout: `${baseAuthPath}/logout`,
    social: `${baseAuthPath}/socialAuth`,
    github: `${baseAuthPath}/github`,
  },
  users: {
    base: baseUsersPath,
  },
  currentUser: {
    base: baseUserPath,
  },
  reviews: {
    base: baseReviewsPath,
    userReviews: `${baseReviewsPath}/userReviews`,
    random: `${baseReviewsPath}/random`,
    new: `${baseReviewsPath}/new`,
    like: `${baseReviewsPath}/like`,
    score: `${baseReviewsPath}/score`,
    img: `${baseReviewsPath}/image`,
  },
  tags: {
    base: baseTagsPath,
  },
};
