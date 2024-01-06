import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

// Define a type for the RootState based on the reducers
export type RootState = ReturnType<typeof store.getState>;

// Define a type for the AppDispatch
export type AppDispatch = typeof store.dispatch;
