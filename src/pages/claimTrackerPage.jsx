import React, { useEffect } from 'react';
import { Container, Typography, CircularProgress, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClaims } from '../state/claimSlice'; // Import your Redux Thunk for fetching data

// Placeholder for the component that will display the claims in a table
import ClaimStatusTable from '../components/Dashboard/ClaimStatusTable.jsx'; 

const ClaimTrackerPage = () => {
  const dispatch = useDispatch();
  
 
  const { claims, status, error } = useSelector((state) => state.claim);

 
  useEffect(() => {
    
    if (status === 'idle') {
      dispatch(fetchClaims());
    }
  }, [dispatch, status]);

  let content;

  if (status === 'loading' || status === 'idle') {
    content = (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <CircularProgress />
        <Typography variant="body1">Loading Claims Data...</Typography>
      </div>
    );
  } else if (status === 'succeeded' && claims.length > 0) {
    // Renders the table component with the claims data
    content = <ClaimStatusTable claims={claims} />;
  } else if (status === 'succeeded' && claims.length === 0) {
    content = <Alert severity="info">No claims have been submitted yet.</Alert>;
  } else if (status === 'failed') {
    content = <Alert severity="error">Error loading claims: {error}</Alert>;
  }

  return (
    <Container maxWidth="lg" style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Claim Status Tracker
      </Typography>
      {/* This is the area where Selenium will monitor for the final status change */}
      {content} 
    </Container>
  );
};

export default ClaimTrackerPage;