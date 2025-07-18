import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext.jsx'; // Import the provider


import Home from './components/Home/Home.jsx';
import Login from './components/Login/Login.jsx';
import Register from './components/Register/Register.jsx';
import DiseaseDetection from './components/Diseasedetection/Diseasedetection.jsx';

function App() {
  return (
    // This provider enables authentication state globally
    <AuthProvider>
      <Router>
        <Toaster />
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/disease-detection" element={<DiseaseDetection />} />
          </Routes>
        </main>
      </Router>
    </AuthProvider>
  );
}

export default App;