export { appReducer, clearGlobalMessage, setError } from './appReducer/appSlice';

export { authReducer, setIsUserAuth } from './authReducer/authSlice';
export { userReducer } from './userReducer/userReducer';

export {
  adminReducer,
  setTableSearchParams,
  setCurrentUser,
} from './adminReducer/adminReducer';

export {
  reviewsReducer,
  setReviewsPaginationParams,
} from './rewiewsReducer/reviewsSlice';

export { commentsReducer } from './commentsReducer/commentsSlice';
