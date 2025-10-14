import React from 'react';
import { TextField, Button, Grid, Typography, FormHelperText } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateForm } from '../../state/claimSlice'; // Path correction for Redux

const ProviderInfo = ({ onNext, onBack }) => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.claim.form);
  const [errors, setErrors] = React.useState({});

  const handleChange = (e) => {
    dispatch(updateForm({ [e.target.name]: e.target.value }));
  };

  const validateAndProceed = () => {
    const newErrors = {};
    
    // Simple validation check for provider license (Example Selenium Target)
    if (!formData.providerLicense || formData.providerLicense.length < 5) {
      newErrors.providerLicense = "Provider License must be at least 5 characters.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onNext();
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6">2. Provider Information</Typography>
      </Grid>
      
      {/* Provider Name */}
      <Grid item xs={6}>
        <TextField
          required
          fullWidth
          label="Provider Name"
          name="providerName"
          value={formData.providerName || ''}
          onChange={handleChange}
        />
      </Grid>
      
      {/* Provider License Number (A key field for E2E testing) */}
      <Grid item xs={6}>
        <TextField
          required
          fullWidth
          label="Provider License No."
          name="providerLicense"
          value={formData.providerLicense || ''}
          onChange={handleChange}
          error={!!errors.providerLicense}
          inputProps={{ 'data-testid': 'provider-license-input' }} // <-- SELENIUM TARGET
        />
        {errors.providerLicense && (
            <FormHelperText error>{errors.providerLicense}</FormHelperText>
        )}
      </Grid>

      {/* Navigation Buttons */}
      <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <Button variant="outlined" onClick={onBack}>
          Back
        </Button>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={validateAndProceed}
          data-testid="step2-next-button"
        >
          Next
        </Button>
      </Grid>
    </Grid>
  );
};

export default ProviderInfo;