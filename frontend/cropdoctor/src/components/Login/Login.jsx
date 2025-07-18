import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'; // Import the context
import axios from 'axios';
import toast from 'react-hot-toast';

const Login = () => {
    // New logic: Get the login function from our AuthContext
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    // Original state management is preserved
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // New logic: The handleSubmit function now uses Axios and updates the global auth state
    const handleSubmit = async (e) => {
        e.preventDefault();
        const toastId = toast.loading('Logging in...');
        try {
            // The backend API call is the same
            const response = await axios.post('/api/v1/users/login', formData);

            // On success, update the global state and navigate
            if (response.data && response.data.data.accessToken) {
                login(response.data.data.accessToken); // This sets the user as logged in globally
                toast.success('Login successful!', { id: toastId });
                navigate('/disease-detection'); // Redirect to the analysis page
            } else {
                toast.error('An unexpected error occurred.', { id: toastId });
            }
        } catch (error) {
            // Error handling is improved
            const errorMessage = error.response?.data?.message || 'Login failed. Please check your credentials.';
            toast.error(errorMessage, { id: toastId });
        }
    };

    // This is your original JSX structure, untouched.
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-xs">
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Email"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            name="password"
                            placeholder="******************"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Sign In
                        </button>
                        <Link to="/register" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                            Create an Account
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;