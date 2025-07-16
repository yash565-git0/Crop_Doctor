import { useEffect } from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './context/AuthContext';
import SignupPage from './components/Register/Register.jsx';
import Login from './components/Login/Login.jsx';
import LandingPage from './components/Home/Home.jsx'

// Set the correct base URL
axios.defaults.baseURL = 'http://localhost:8000/api/v1/users';
axios.defaults.withCredentials = true;

// The App component now serves as a layout
function App() {
  const { setIsLoggedIn, setAuthUser } = useAuth();

  // This effect runs once when the app loads to check for an existing session
  useEffect(() => {
    const checkCurrentUser = async () => {
      try {
        const response = await axios.get('/me'); // Calls /api/v1/users/me
        if (response.data.data.user) {
          setIsLoggedIn(true);
          setAuthUser(response.data.data.user);
        }
      } catch (error) {
        setIsLoggedIn(false);
        setAuthUser(null);
      }
    };
    checkCurrentUser();
  }, [setIsLoggedIn, setAuthUser]);

  return (
    <>
      {/* You can add a Navbar here that will show on all pages */}
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
      { path: 'register', element: <SignupPage /> },
      { path:'',element:<LandingPage />},
      { path: 'login', element: <Login /> },
      // Add your protected routes for dashboard etc. here later
    ],
  },
]);

export default App;