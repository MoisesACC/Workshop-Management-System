
import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('workshop_user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [isAdmin, setIsAdmin] = useState(() => {
        const savedUser = localStorage.getItem('workshop_user');
        if (savedUser) {
            const parsed = JSON.parse(savedUser);
            return parsed.role === 'ADMIN';
        }
        return false;
    });

    const login = async (email, password) => {
        try {
            const res = await api.post('/auth/login', { email, password });
            const userData = res.data;
            setUser(userData);
            setIsAdmin(userData.role === 'ADMIN');
            localStorage.setItem('workshop_user', JSON.stringify(userData));
            return userData;
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        setIsAdmin(false);
        localStorage.removeItem('workshop_user');
        localStorage.removeItem('token');
    };

    // Helper to update user data and keep localStorage synced
    const updateUserData = (newData) => {
        const updatedUser = { ...user, ...newData };
        setUser(updatedUser);
        setIsAdmin(updatedUser.role === 'ADMIN');
        localStorage.setItem('workshop_user', JSON.stringify(updatedUser));
    };

    return (
        <AuthContext.Provider value={{ user, isAdmin, login, logout, updateUserData }}>
            {children}
        </AuthContext.Provider>
    );
};
