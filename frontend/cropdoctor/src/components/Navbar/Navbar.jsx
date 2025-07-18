import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'; // Import the context directly
import toast from 'react-hot-toast';

const Navbar = () => {
    // Use the context directly and provide a fallback
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        if (auth) {
            auth.logout();
            toast.success('Logged out successfully!');
            navigate('/');
        }
    };

    // Safely check if the user is logged in
    const isLoggedIn = auth?.isLoggedIn;
    const user = auth?.user;

    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between">
                    <div className="flex space-x-7">
                        <div>
                            <Link to="/" className="flex items-center py-4 px-2">
                                <span className="font-semibold text-gray-500 text-lg">AgriSmart</span>
                            </Link>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center space-x-3">
                        {isLoggedIn ? (
                            <>
                                <span className="py-2 px-2 font-medium text-gray-500">
                                    Hello, {user?.fullName || 'User'}
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="py-2 px-2 font-medium text-white bg-red-500 rounded hover:bg-red-400 transition duration-300"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-green-500 hover:text-white transition duration-300">Log In</Link>
                                <Link to="/register" className="py-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300">Sign Up</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;