import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
// FIX: Explicitly add .js extension to local state import
import { submitClaim } from '../state/claimSlice.js'; 
// ClaimStatusTable is not needed on this page, but we'll leave the import commented out if it was intended
// import ClaimStatusTable from '../components/Dashboard/ClaimStatusTable.jsx'; 

import { Container, Stepper, Step, StepLabel, Box, CircularProgress, Alert, Button } from '@mui/material'; 

// FIX: Explicitly ensure .jsx extension is used for all local component imports
import PolicyInfo from '../components/claimForm/policyInfo.jsx';
import ProviderInfo from '../components/claimForm/providerInfo.jsx'; 
import ServiceDetails from '../components/claimForm/serviceDetails.jsx'; 
import ReviewSubmit from '../components/claimForm/reviewSubmit.jsx';

const steps = ['Policy Info', 'Provider Info', 'Service Details', 'Review & Submit'];

const ClaimSubmissionPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch();
  
  // Get state from Redux store for loading/errors
  const { form, status, error } = useSelector((state) => state.claim);

  // Function to render the correct step component
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <PolicyInfo onNext={() => setActiveStep(1)} />; 
      case 1:
        return <ProviderInfo onNext={() => setActiveStep(2)} onBack={() => setActiveStep(0)} />; 
      case 2:
        return <ServiceDetails onNext={() => setActiveStep(3)} onBack={() => setActiveStep(1)} />; 
      case 3:
        return (
          <ReviewSubmit 
            onBack={() => setActiveStep(2)} 
            onFinalSubmit={handleFinalSubmit} // Final submission logic
          />
        );
      default:
        return 'Unknown step';
    }
  };

  // Logic for Final Submission (Dispatches Redux Thunk)
  const handleFinalSubmit = () => {
    // Dispatch the Redux thunk to send data to the Node.js backend
    dispatch(submitClaim(form));
  };

  // --- RENDERING POST-SUBMISSION STATUS ---
  if (status === 'loading') {
    return (
      <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
        <CircularProgress data-testid="submission-loading" />
        <p>Submitting claim...</p>
      </Container>
    );
  }

  if (status === 'succeeded' && activeStep === 3) {
    return (
      <Container maxWidth="sm" style={{ marginTop: '50px' }}>
        <Alert severity="success" data-testid="submission-success-message"> {/* SELENIUM TARGET for success */}
          Claim Submitted Successfully! Your Claim ID is: {form.claimId}.
          <br/>
          You can track the status on the Claim Tracker Page.
        </Alert>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button variant="contained" href="/track">Go to Tracker</Button>
        </Box>
      </Container>
    );
  }

  if (status === 'failed') {
    return (
      <Container maxWidth="sm" style={{ marginTop: '50px' }}>
        <Alert severity="error">
          Submission Failed: {error || 'An unexpected error occurred.'}
        </Alert>
      </Container>
    );
  }
  // --- END RENDERING POST-SUBMISSION STATUS ---

  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <Stepper activeStep={activeStep} alternativeLabel style={{ marginBottom: '30px' }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
      <Box sx={{ p: 3, border: '1px solid #ddd', borderRadius: '4px' }}>
        {getStepContent(activeStep)}
      </Box>
    </Container>
  );
};

export default ClaimSubmissionPage;