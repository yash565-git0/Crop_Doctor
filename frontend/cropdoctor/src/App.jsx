import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext'; // Import the provider

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import DiseaseDetection from './components/Diseasedetection/Diseasedetection';

function App() {
  return (
    // This provider enables authentication state globally
    <AuthProvider>
      <Router>
        <Toaster />
        <Navbar />
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