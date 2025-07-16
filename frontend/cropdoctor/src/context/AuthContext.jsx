import React, { createContext, useState, useContext } from 'react';

// Create the context
const AuthContext = createContext(null);

// Create the provider component
export const AuthProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // The values to be shared with consuming components
    const value = {
        authUser,
        setAuthUser,
        isLoggedIn,
        setIsLoggedIn
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Create a custom hook for easy access to the context
export const useAuth = () => {
    return useContext(AuthContext);
};