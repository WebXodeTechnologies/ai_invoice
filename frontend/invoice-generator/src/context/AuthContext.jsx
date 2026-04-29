import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

// 1. Initialize Context
const AuthContext = createContext(null);

/**
 * AuthProvider Component
 * Handles the global authentication state logic.
 */
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('refreshToken');
        
        setUser(null);
        window.location.href = '/'; // Forces a clean state
    }, []);

    const checkAuthStatus = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            const userStr = localStorage.getItem('user');

            if (token && userStr) {
                setUser(JSON.parse(userStr));
            }
        } catch (error) {
            console.error('Initial auth check failed:', error);
            logout();
        } finally {
            setLoading(false);
        }
    }, [logout]);

    useEffect(() => {
        checkAuthStatus();
    }, [checkAuthStatus]);

    const login = (userData, token) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        // Bug Fix: isAuthenticated is derived from 'user' state automatically
    };

    const updateUser = (updatedUserData) => {
        setUser((prevUser) => {
            const newUserData = { ...prevUser, ...updatedUserData };
            localStorage.setItem('user', JSON.stringify(newUserData));
            return newUserData;
        });
    };

    // 2. Optimization: useMemo prevents the entire app from re-rendering
    // unless the user or loading state actually changes.
    const value = useMemo(() => ({
        user,
        loading,
        isAuthenticated: !!user,
        login,
        logout,
        updateUser,
        checkAuthStatus
    }), [user, loading, logout, checkAuthStatus]);

    return (
        <AuthContext.Provider value={value}>
            {/* 3. Robustness: Only render children when initial check is done */}
            {!loading ? children : (
                <div className="flex items-center justify-center h-screen">
                    {/* Replace with your actual UI spinner */}
                    <span>Loading...</span>
                </div>
            )}
        </AuthContext.Provider>
    );
};

/**
 * useAuth Hook
 * Custom hook to access auth context easily.
 */
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};