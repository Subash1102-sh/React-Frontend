import React from 'react';
import { Button, Grid, Typography, Paper } from '@mui/material'; // Material-UI imports
import { useSelector } from 'react-redux';


const Step4_ReviewSubmit = ({ onBack, onFinalSubmit }) => {
  // Retrieve the full form data from the Redux store
  const formData = useSelector((state) => state.claim.form);

  // Helper function to render a detail item
  const DetailItem = ({ label, value }) => (
    <Grid container spacing={1} style={{ marginBottom: '8px' }}>
      <Grid item xs={6}>
        <Typography variant="body2" color="textSecondary">{label}:</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="body1" fontWeight="bold">{value}</Typography>
      </Grid>
    </Grid>
  );

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>4. Review and Submit</Typography>
        <Typography variant="subtitle1" color="error">
          Please verify all details before submitting to Excellus BlueCross BlueShield.
        </Typography>
      </Grid>

      {/* Review Section */}
      <Grid item xs={12}>
        <Paper elevation={2} style={{ padding: '20px' }}>
          <Typography variant="h6" gutterBottom>Claim Details Summary</Typography>

          <DetailItem label="Policy ID" value={formData.policyId || 'N/A'} />
          <DetailItem label="Patient Name" value={formData.patientName || 'N/A'} />
          
          <hr style={{ margin: '15px 0' }} />
          
          <DetailItem label="Provider Name" value={formData.doctorName || 'N/A'} />
          <DetailItem label="NPI" value={formData.npi || 'N/A'} />

          <hr style={{ margin: '15px 0' }} />

          {/* CRITICAL DATA POINTS for E2E Validation */}
          <DetailItem 
            label="Date of Service" 
            value={formData.dateOfService || 'N/A'} 
            // Optional: You can put a data-testid here if you need to specifically validate the displayed date
            // data-testid="review-date-of-service"
          />
          <DetailItem 
            label="CPT Code" 
            value={formData.cptCode || 'N/A'} 
          />
          <DetailItem 
            label="Billed Amount" 
            value={`$${(formData.billedAmount || 0).toFixed(2)}`} 
          />
        </Paper>
      </Grid>

      {/* Navigation and Submission Buttons */}
      <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <Button 
          variant="outlined" 
          onClick={onBack}
          data-testid="step4-back-button" // SELENIUM TARGET
        >
          Go Back to Edit
        </Button>
        
        {/* FINAL SUBMIT BUTTON: CRITICAL SELENIUM TARGET */}
        <Button 
          variant="contained" 
          color="success" 
          onClick={onFinalSubmit}
          data-testid="final-submit-button"
        >
          Submit Claim
        </Button>
      </Grid>
    </Grid>
  );
};

export default Step4_ReviewSubmit;