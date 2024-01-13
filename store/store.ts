import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import shareReducer from './shareSlice';
import pollReducer from './pollSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    shares: shareReducer,
    polls: pollReducer,
  },
});

// Define a type for the RootState based on the reducers
export type RootState = ReturnType<typeof store.getState>;

// Define a type for the AppDispatch
export type AppDispatch = typeof store.dispatch;
