import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState, UserType } from '../types';  // Adjust the path as necessary

// Define the initial state using the AppState interface
const initialState: UserState = {
  user: null,
  userLoading: true,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType | null>) => {
      state.user = action.payload;
    },
    setUserLoading: (state, action: PayloadAction<boolean>) => {
      state.userLoading = action.payload;
    },
  },
});

// Export the actions
export const { setUser, setUserLoading } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
