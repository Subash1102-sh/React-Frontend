import { configureStore } from '@reduxjs/toolkit';
// Ensure 'claimSlice.js' exists in the same directory (src/state/)
import claimReducer from './claimSlice.js'; 

const store = configureStore({
  // The 'claim' key here must match how you access the state (state.claim.form)
  reducer: {
    claim: claimReducer, 
  },
});

export default store;
