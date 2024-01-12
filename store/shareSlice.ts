import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ShareState, ShareType } from '../types';  // Adjust the path as necessary

// Define the initial state using the AppState interface
const initialState: ShareState = {
  shares: [],
  sharesLoading: true,
};

export const shareSlice = createSlice({
  name: 'share',
  initialState,
  reducers: {
    setShares: (state, action: PayloadAction<ShareType[]>) => {
      state.shares = action.payload;
    },
    setSharesLoading: (state, action: PayloadAction<boolean>) => {
      state.sharesLoading = action.payload;
    },
  },
});

// Export the actions
export const { setShares, setSharesLoading } = shareSlice.actions;

// Export the reducer
export default shareSlice.reducer;

