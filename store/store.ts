import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import shareReducer from './shareSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    shares: shareReducer,
  },
});

// Define a type for the RootState based on the reducers
export type RootState = ReturnType<typeof store.getState>;

// Define a type for the AppDispatch
export type AppDispatch = typeof store.dispatch;
