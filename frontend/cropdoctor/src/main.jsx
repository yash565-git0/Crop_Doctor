import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './context/AuthContext.jsx'; // Import the provider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* By wrapping App here, every component now has access to the auth state */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
);