import api from "../utils/axiosConfig";

const categoryService = {
    getAllCategories: async () => {
        try {
            const response = await api.get('/api/categories');
            return response.data;
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw error;
        }
    }
};

export default categoryService;
