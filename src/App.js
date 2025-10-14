import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// Import your page components
import ClaimSubmissionPage from './pages/claimSubmissionPage';
import ClaimTrackerPage from './pages/claimTrackerPage';

// You can remove unused imports like logo and './App.css' if you replace the default styling
// import './App.css'; 

function App() {
  return (
    // 1. Set up the Router context for navigation
    <Router>
      <div className="App">
        {/*
          Optional: Add a Header/NavBar component here that contains links to /submit and /track.
        */}
        
        <main>
          {/* 2. Define the Routes for the application */}
          <Routes>
            {/* Main Claim Submission Route */}
            <Route 
              path="/submit" 
              element={<ClaimSubmissionPage />} 
            />
            
            {/* Claim Status Tracker Route */}
            <Route 
              path="/track" 
              element={<ClaimTrackerPage />} 
            />
            
            {/* Default Route: Redirects users from the root URL (/) to the submission form */}
            <Route 
              path="/" 
              element={<Navigate replace to="/submit" />} 
            />
            
            {/* Optional: Add a 404 Not Found Page */}
            {/* <Route path="*" element={<h1>404: Page Not Found</h1>} /> */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;