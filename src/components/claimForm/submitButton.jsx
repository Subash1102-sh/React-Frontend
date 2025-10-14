import React from 'react';
import { Button } from '@mui/material';

const SubmitButton = ({ onSubmit }) => {
  return (
    <Button 
      variant="contained" 
      color="success" 
      fullWidth
      onClick={onSubmit}
      data-testid="final-submit-button" 
    >
      Submit Claim
    </Button>
  );
};

export default SubmitButton;