import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
    // You can specify defaults like this:
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to automatically add the JWT token
api.interceptors.request.use(
    (config) => {
        // Try to get token from localStorage
        const token = localStorage.getItem('token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
