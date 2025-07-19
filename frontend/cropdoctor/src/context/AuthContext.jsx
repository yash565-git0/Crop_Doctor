import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

// Create the context with a default value of null
export const AuthContext = createContext(null);

// The Provider component that will wrap your app
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    // This effect runs once to check for an existing token in localStorage
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                if (decoded.exp * 1000 > Date.now()) {
                    setIsLoggedIn(true);
                    setUser(decoded);
                } else {
                    localStorage.removeItem('token');
                }
            } catch (error) {
                console.error("Invalid token found:", error);
                localStorage.removeItem('token');
            }
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        const decoded = jwtDecode(token);
        setUser(decoded);
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setIsLoggedIn(false);
    };

    // The value provided to all children components
    const value = { isLoggedIn, user, login, logout, setUser, setIsLoggedIn };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};