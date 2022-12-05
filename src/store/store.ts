import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {appReducer, authReducer, userReducer} from "store/reducers";


const rootReducer = combineReducers({
  appReducer,
  authReducer,
  userReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;