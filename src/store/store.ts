import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {
  adminReducer,
  appReducer,
  authReducer,
  commentsReducer,
  reviewsReducer,
  userReducer
} from "store/reducers";


const rootReducer = combineReducers({
  appReducer,
  authReducer,
  userReducer,
  adminReducer,
  reviewsReducer,
  commentsReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;