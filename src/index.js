import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Redux Imports
import { Provider } from 'react-redux';
// The problem line: MUST resolve to 'E:\claim-automation\app\client\src\state\store.js'
import store from './state/store'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Wrapping the App in the Redux Provider */}
    <Provider store={store}> 
      <App />
    </Provider>
  </React.StrictMode>
);
