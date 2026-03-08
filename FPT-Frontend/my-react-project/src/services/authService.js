import api from '../utils/axiosConfig';

/**
 * Service for handling authentication related API calls.
 */
const authService = {
    /**
     * Login user to backend
     * @param {string} username 
     * @param {string} password 
     * @returns {Promise} response of the API call
     */
    login: async (username, password) => {
        try {
            // Calls http://localhost:8080/api/auth/login or similar, according to your backend setup.
            // E.g: return await api.post('/api/auth/login', { username, password });

            const response = await api.post('/api/auth/login', { username, password });

            // Save token to localStorage if the backend responds with it
            if (response.data && response.data.token) {
                localStorage.setItem('token', response.data.token);
            }

            return response.data;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },

    /**
     * Register a new user
     * @param {Object} userData
     */
    register: async (userData) => {
        try {
            const response = await api.post('/api/auth/register', userData);
            return response.data;
        } catch (error) {
            console.error('Register error:', error);
            throw error;
        }
    },

    /**
     * Logout user by removing the token
     */
    logout: () => {
        localStorage.removeItem('token');
    }
};

export default authService;
