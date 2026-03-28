/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import authService from "../services/authService";
import api from "../utils/axiosConfig";

const AuthContext = createContext();

const parseJwt = (token) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch {
        return null;
    }
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const loadUserProfile = async (token) => {
        try {
            const response = await api.get('/api/user/profile');
            const data = response.data;
            setUser({ 
                authenticated: true,
                id: data.id,
                username: data.username || data.fullName || 'Chef',
                email: data.email,
                role: data.role,
                avatar: data.avatarUrl || null,
                bio: data.bio || 'Enthusiastic chef ready to explore new flavors and share recipes.'
            });
        } catch (error) {
            console.error("Failed to fetch user profile", error);
            // Fallback to JWT data if API fails but token might be valid
            const decoded = parseJwt(token);
            if (decoded) {
                 setUser({ 
                    authenticated: true,
                    username: decoded.name || decoded.sub || decoded.username || 'Chef',
                    email: decoded.email,
                    role: decoded.role || decoded.roles,
                    avatar: null,
                    bio: 'Enthusiastic chef ready to explore new flavors and share recipes.',
                    id: decoded.userId || decoded.id
                });
            } else {
                 logout();
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("isAuthenticated");
        
        if (isLoggedIn === "true") {
            loadUserProfile(null);
        } else {
            setIsLoading(false);
        }
    }, []);

    const login = async (emailOrUsername, password) => {
        const data = await authService.login(emailOrUsername, password);
        localStorage.setItem("isAuthenticated", "true");
        await loadUserProfile(null);
        return data;
    };

    const oauthLogin = async () => {
        localStorage.setItem("isAuthenticated", "true");
        await loadUserProfile(null);
    };

    const logout = () => {
        authService.logout();
        localStorage.removeItem("isAuthenticated");
        setUser(null);
    };

    const updateUserProfile = (newData) => {
        setUser(prev => ({ 
            ...prev, 
            avatar: newData.avatarUrl !== undefined ? newData.avatarUrl : prev?.avatar,
            bio: newData.bio !== undefined ? newData.bio : prev?.bio,
            username: newData.username !== undefined ? newData.username : prev?.username,
            fullName: newData.fullName !== undefined ? newData.fullName : prev?.fullName
        }));
    };

    const value = {
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        oauthLogin,
        logout,
        updateUserProfile
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};