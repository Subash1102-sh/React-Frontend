import React from 'react';
import { TextField, Button, Grid, Typography, FormHelperText } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateForm } from '../../state/claimSlice.js';

const ServiceDetails = ({ onNext, onBack }) => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.claim.form);
  const [errors, setErrors] = React.useState({});

  const handleChange = (e) => {
    dispatch(updateForm({ [e.target.name]: e.target.value }));
  };

  const validateAndProceed = () => {
    const newErrors = {};
    const chargeAmount = parseFloat(formData.chargeAmount);

    if (!formData.serviceDate) {
      newErrors.serviceDate = "Service Date is required.";
    }

    // Simple validation for charge amount
    if (isNaN(chargeAmount) || chargeAmount <= 0) {
      newErrors.chargeAmount = "Charge Amount must be a positive number.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onNext();
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6">3. Service Details</Typography>
      </Grid>
      
      {/* Date of Service (A key field for E2E testing) */}
      <Grid item xs={6}>
        <TextField
          required
          fullWidth
          label="Date of Service"
          type="date"
          InputLabelProps={{ shrink: true }}
          name="serviceDate"
          value={formData.serviceDate || ''}
          onChange={handleChange}
          error={!!errors.serviceDate}
          helperText={errors.serviceDate}
          inputProps={{ 'data-testid': 'service-date-input' }} // <-- SELENIUM TARGET
        />
      </Grid>
      
      {/* Total Charge Amount */}
      <Grid item xs={6}>
        <TextField
          required
          fullWidth
          label="Total Charge Amount ($)"
          type="number"
          name="chargeAmount"
          value={formData.chargeAmount || ''}
          onChange={handleChange}
          error={!!errors.chargeAmount}
          helperText={errors.chargeAmount}
        />
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
          data-testid="step3-next-button"
        >
          Next
        </Button>
      </Grid>
    </Grid>
  );
};

export default ServiceDetails;
