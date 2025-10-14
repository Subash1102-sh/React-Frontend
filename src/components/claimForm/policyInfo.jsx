import React from 'react';
import { TextField, Button, Grid, Typography, FormHelperText } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateForm } from '../../state/claimSlice.js'; // Ensure .js extension is correct

const PolicyInfo = ({ onNext }) => {
  const dispatch = useDispatch();
  // Read the current form data from Redux state
  const formData = useSelector((state) => state.claim.form);
  const [errors, setErrors] = React.useState({});

  // This handler saves the input to Redux state on every change
  const handleChange = (e) => {
    dispatch(updateForm({ [e.target.name]: e.target.value }));
  };

  const validateAndProceed = () => {
    const newErrors = {};
    
    // Simple validation check for Policy ID (Example Selenium Target)
    if (!formData.policyId || formData.policyId.length < 5) {
      newErrors.policyId = "Policy ID must be at least 5 characters.";
    }
    if (!formData.patientName || formData.patientName.trim() === '') {
      newErrors.patientName = "Patient Name is required.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onNext();
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6">1. Policy and Patient Information</Typography>
      </Grid>
      
      {/* Policy ID Field */}
      <Grid item xs={6}>
        <TextField
          required
          fullWidth
          label="Policy ID (e.g. AB12345678)"
          name="policyId"
          // CRITICAL: Reads value from Redux state
          value={formData.policyId || ''} 
          // CRITICAL: Updates Redux state on change
          onChange={handleChange} 
          error={!!errors.policyId}
          helperText={errors.policyId}
          inputProps={{ 'data-testid': 'policy-id-input' }} // <-- SELENIUM TARGET
        />
      </Grid>
      
      {/* Patient Name Field */}
      <Grid item xs={6}>
        <TextField
          required
          fullWidth
          label="Patient Name"
          name="patientName"
          // CRITICAL: Reads value from Redux state
          value={formData.patientName || ''} 
          // CRITICAL: Updates Redux state on change
          onChange={handleChange} 
          error={!!errors.patientName}
          helperText={errors.patientName}
        />
      </Grid>

      {/* Navigation Button */}
      <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={validateAndProceed}
          data-testid="step1-next-button"
        >
          Next
        </Button>
      </Grid>
    </Grid>
  );
};

export default PolicyInfo;