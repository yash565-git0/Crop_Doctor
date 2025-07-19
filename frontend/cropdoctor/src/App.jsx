import './App.css';
import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthContext } from './context/AuthContext.jsx';
import Navbar from './components/Navbar/Navbar.jsx';

import Home from './components/Home/Home.jsx';
import LoginPage from './components/Login/Login.jsx';
import SignupPage from './components/Register/Register.jsx';
import Diseasedetection from './components/Diseasedetection/Diseasedetection.jsx';

// This component protects routes that require a user to be logged in
const ProtectedRoute = ({ children }) => {
    const { isLoggedIn }  = useContext(AuthContext);
    if (!isLoggedIn) {
        // Redirect them to the /login page, but save the current location they were trying to go to
        return <Navigate to="/login" replace />;
    }
    return children;
};

function App() {
  return (
    // Wrap everything in AuthProvider
    
      <Router>
        <Toaster />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignupPage />} />
          <Route
            path="/disease-detection"
            element={
              <ProtectedRoute>
                <Diseasedetection />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    
  );
}

export default App;