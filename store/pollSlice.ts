import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PollState, PollType } from '../types';  // Adjust the path as necessary

// Define the initial state using the AppState interface
const initialState: PollState = {
  polls: [],
  pollsLoading: true,
};

export const pollSlice = createSlice({
  name: 'poll',
  initialState,
  reducers: {
    setPolls: (state, action: PayloadAction<PollType[]>) => {
      state.polls = action.payload;
    },
    setPollsLoading: (state, action: PayloadAction<boolean>) => {
      state.pollsLoading = action.payload;
    },
  },
});

// Export the actions
export const { setPolls, setPollsLoading } = pollSlice.actions;

// Export the reducer
export default pollSlice.reducer;
