import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const ClaimStatusTable = ({ claims }) => {
  if (!claims || claims.length === 0) {
    return <Typography variant="h6" align="center" style={{ marginTop: '20px' }}>No claims submitted yet.</Typography>;
  }

  return (
    <TableContainer component={Paper} style={{ marginTop: '20px' }}>
      <Table aria-label="claim status table">
        <TableHead>
          <TableRow>
            <TableCell>Claim ID</TableCell>
            <TableCell>Patient Name</TableCell>
            <TableCell>Date of Service</TableCell>
            <TableCell>Status</TableCell> {/* <-- CRITICAL COLUMN */}
          </TableRow>
        </TableHead>
        <TableBody>
          {claims.map((claim, index) => (
            <TableRow key={claim.claimId || index}>
              <TableCell component="th" scope="row">
                {claim.claimId || 'N/A'}
              </TableCell>
              <TableCell>{claim.patientName || 'N/A'}</TableCell>
              <TableCell>{claim.dateOfService || 'N/A'}</TableCell>
              
              {/* STATUS CELL: The Selenium target for synchronization */}
              <TableCell 
                // CRITICAL SELENIUM TARGET for Explicit Wait on status change
                data-testid={`status-for-claim-${claim.claimId}`} 
                style={{ color: claim.status === 'Approved' ? 'green' : (claim.status === 'Denied' ? 'red' : 'orange') }}
              >
                {claim.status}
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ClaimStatusTable;