/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import authService from "../services/authService";

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

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("isAuthenticated");
        const token = localStorage.getItem("jwtToken");
        if (isLoggedIn === "true" && token) {
            const decoded = parseJwt(token);
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setUser({ 
                authenticated: true,
                username: decoded?.name || decoded?.sub || decoded?.username || 'Chef',
                email: decoded?.email,
                role: decoded?.role || decoded?.roles,
                avatar: localStorage.getItem("userAvatar") || decoded?.picture || decoded?.avatar || null,
                id: decoded?.userId || decoded?.id
            });
        } else if (isLoggedIn === "true") {
            setUser({ authenticated: true, avatar: localStorage.getItem("userAvatar") });
        }
    }, []);

    const login = async (emailOrUsername, password) => {
        const data = await authService.login(emailOrUsername, password);
        localStorage.setItem("isAuthenticated", "true");
        if (data.token) {
            localStorage.setItem("jwtToken", data.token);
            const decoded = parseJwt(data.token);
            setUser({ 
                authenticated: true,
                username: decoded?.name || decoded?.sub || decoded?.username,
                email: decoded?.email,
                role: decoded?.role || decoded?.roles,
                avatar: localStorage.getItem("userAvatar") || decoded?.picture || decoded?.avatar || null,
                id: decoded?.userId || decoded?.id
            });
        } else {
            setUser({ authenticated: true, avatar: localStorage.getItem("userAvatar") });
        }
        return data;
    };

    const oauthLogin = (token) => {
        localStorage.setItem("jwtToken", token);
        localStorage.setItem("isAuthenticated", "true");
        const decoded = parseJwt(token);
        setUser({ 
            authenticated: true,
            username: decoded?.name || decoded?.sub || decoded?.username,
            email: decoded?.email,
            role: decoded?.role || decoded?.roles,
            avatar: localStorage.getItem("userAvatar") || decoded?.picture || decoded?.avatar || null,
            id: decoded?.userId || decoded?.id
        });
    };

    const logout = () => {
        authService.logout();
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("jwtToken");
        setUser(null);
    };

    const updateUserAvatar = (newAvatar) => {
        localStorage.setItem("userAvatar", newAvatar);
        setUser(prev => ({ ...prev, avatar: newAvatar }));
    };

    const value = {
        user,
        isAuthenticated: !!user,
        login,
        oauthLogin,
        logout,
        updateUserAvatar
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