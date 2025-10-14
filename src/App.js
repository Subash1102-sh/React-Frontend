import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ClaimSubmissionPage from './pages/claimSubmissionPage.jsx';
import ClaimTrackerPage from './pages/ClaimTrackerPage.jsx';

// Component for the main navigation/header (assuming it's reusable)
const Header = () => (
  <header style={{ padding: '20px', borderBottom: '1px solid #ddd', textAlign: 'center' }}>
    <nav>
      <a href="/React-Frontend/" style={{ margin: '0 15px', textDecoration: 'none', color: '#1976d2', fontWeight: 'bold' }}>
        Home (Submit Claim)
      </a>
      <a href="/React-Frontend/track" style={{ margin: '0 15px', textDecoration: 'none', color: '#1976d2', fontWeight: 'bold' }}>
        Track Claims
      </a>
    </nav>
  </header>
);

const App = () => {
  return (
    // FIX: Add the basename prop to BrowserRouter to correctly handle GitHub Pages deployment
    // The basename should match your GitHub repository name.
    <BrowserRouter basename="/React-Frontend">
      <Header />
      <Routes>
        {/* Route for the claim submission form (Home page) */}
        <Route path="/" element={<ClaimSubmissionPage />} />
        
        {/* Route for the claim tracker dashboard */}
        <Route path="/track" element={<ClaimTrackerPage />} />
        
        {/* Fallback route for 404s (optional but good practice) */}
        <Route path="*" element={
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>404 - Page Not Found</h2>
            <p>The page you requested does not exist.</p>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
