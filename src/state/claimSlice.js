import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Get the base API URL from the environment variables.
// This will be 'http://localhost:5000' locally (from .env)
// and 'https://claim-automation-production.up.railway.app' in production (from hosting settings).
const API_BASE_URL = process.env.REACT_APP_API_URL;

// Define the API endpoint paths relative to the base URL
const CLAIMS_API = `${API_BASE_URL}/api/claims`; 

// --- 1. INITIAL STATE ---
const initialState = {
  // Stores data while user fills out the multi-step form
  form: {},
  // Stores the list of claims for the tracker dashboard
  claims: [],
  // Status flags for the API interaction
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// --- 2. ASYNCHRONOUS THUNKS (API Calls) ---

/**
 * Thunk to submit the final claim data to the Node.js backend.
 * This is called by Step4_ReviewSubmit.jsx.
 */
export const submitClaim = createAsyncThunk('claims/submitClaim', async (claimData, { rejectWithValue }) => {
  try {
    // Use the full absolute path for the submission endpoint
    const response = await axios.post(`${CLAIMS_API}/submit`, claimData);
    // Backend should return the new claim ID
    return response.data; 
  } catch (err) {
    return rejectWithValue(err.response?.data || 'Network Error or Invalid Response');
  }
});

/**
 * Thunk to fetch all submitted claims for the tracker page.
 * This is called by ClaimTrackerPage.jsx.
 */
export const fetchClaims = createAsyncThunk('claims/fetchClaims', async (_, { rejectWithValue }) => {
  try {
    // Use the full absolute path for the fetch endpoint
    const response = await axios.get(CLAIMS_API);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || 'Network Error or Invalid Response');
  }
});

// --- 3. THE SLICE ---

const claimSlice = createSlice({
  name: 'claim',
  initialState,
  
  // Synchronous reducers for local state changes
  reducers: {
    // Used by Step components to update form data locally
    updateForm: (state, action) => {
      state.form = { ...state.form, ...action.payload };
    },
    resetForm: (state) => {
      state.form = {};
      state.status = 'idle'; // Reset status after submission/failure
    },
  },

  // Asynchronous reducers to handle the thunk lifecycle
  extraReducers: (builder) => {
    builder
      // --- SUBMIT CLAIM lifecycle ---
      .addCase(submitClaim.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(submitClaim.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add the newly submitted claim to the list and save the returned ID
        const newClaim = { ...state.form, claimId: action.payload.claimId, status: 'Submitted' };
        state.claims.push(newClaim);
       state.form = newClaim; // Store the ID in the form state for the success message
      })
      .addCase(submitClaim.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to submit claim';
      })

      // --- FETCH CLAIMS lifecycle ---
      .addCase(fetchClaims.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchClaims.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.claims = action.payload; // Replace the claims array with fresh data from the backend
      })
      .addCase(fetchClaims.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch claims';
      });
  },
});

export const { updateForm, resetForm } = claimSlice.actions;

export default claimSlice.reducer;
