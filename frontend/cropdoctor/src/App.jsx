import { useEffect } from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './context/AuthContext';
import SignupPage from './components/Register/Register.jsx';
import LoginPage from './components/Login/Login.jsx';
import LandingPage from './components/Home/Home.jsx';
import DiseaseDetection from './components/Diseasedetection/Diseasedetection.jsx';
import CropRecords from './components/Croprecords/Croprecords.jsx';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx'; // Import the new component


// Set the correct base URL
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true;

// The App component now serves as a layout
function App() {
  const { isLoggedIn, setIsLoggedIn, setAuthUser } = useAuth();

  // This effect runs once when the app loads to check for an existing session
  useEffect(() => {
    const checkCurrentUser = async () => {
      try {
        const response = await axios.get('/api/v1/users/me');  // Calls /api/v1/users/me
        if (response.data.data.user) {
          setIsLoggedIn(true);
          setAuthUser(response.data.data.user);
        }
      } catch (error) {
        setIsLoggedIn(false);
        setAuthUser(null);
      }
    };
    
    // Only run the check if the user isn't already logged in from a previous action
    if (!isLoggedIn) {
        checkCurrentUser();
    }

  }, [isLoggedIn, setIsLoggedIn, setAuthUser]);

  return (
    <>
      <main>
        <Outlet /> {/* Child routes will be rendered here */}
      </main>
    </>
  );
}

// Update your router to use App as the root layout component
export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // App is now the main element
    children: [
      // Public Routes
      { path: '', element: <LandingPage />},
      { path: 'register', element: <SignupPage /> },
      { path: 'login', element: <LoginPage /> },

      // Protected Routes
      {
        element: <ProtectedRoute />,
        children: [
          { path: 'disease-detection', element: <DiseaseDetection /> },
          { path: 'crop-records', element: <CropRecords /> }
        ]
      }
    ],
  },
]);

export default App
