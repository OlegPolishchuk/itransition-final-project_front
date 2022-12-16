export {
  appReducer,
  clearGlobalMessage,
  setError,
  toggleTheme
} from './appReducer/appSlice';

export {authReducer, setIsUserAuth} from './authReducer/authSlice';
export {userReducer} from './userReducer/userReducer';

export {
  adminReducer,
  setTableSearchParams,
  setCurrentUser
} from './adminReducer/adminReducer';

export {
  reviewsReducer,
  setReviewsPaginationParams,
  setReviewsSortType,
} from './rewiewsReducer/reviewsSlice';