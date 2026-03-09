import api from './../utils/axiosConfig';

/**
 * Service để xử lý các lệnh gọi API liên quan đến sản phẩm / công thức nấu ăn.
 */
const productService = {
    /**
     * Tìm kiếm sản phẩm (recipes) theo từ khóa
     * @param {string} keyword 
     * @returns {Promise} dữ liệu phản hồi từ API
     */
    searchProducts: async (keyword = '', page = 0, size = 12, filters = {}) => {
        try {
            const params = new URLSearchParams();
            if (keyword) params.append('keyword', keyword);
            params.append('page', page);
            params.append('size', size);

            if (filters.maxCookingTime) params.append('maxCookingTime', filters.maxCookingTime);
            if (filters.minCalories) params.append('minCalories', filters.minCalories);
            if (filters.maxCalories) params.append('maxCalories', filters.maxCalories);

            if (filters.tags && Array.isArray(filters.tags) && filters.tags.length > 0) {
                // Spring Boot lists in request params can be comma-separated or repeated.
                params.append('tags', filters.tags.join(','));
            }

            const response = await api.get(`/api/products/search?${params.toString()}`);
            return response.data;
        } catch (error) {
            console.error('Lỗi khi tìm kiếm sản phẩm:', error);
            throw error;
        }
    },

    /**
     * Tìm kiếm sản phẩm theo nguyên liệu
     * @param {Array<string>} ingredients Danh sách tên các nguyên liệu
     * @returns {Promise} dữ liệu phản hồi từ API
     */
    smartSearch: async (ingredients) => {
        try {
            const response = await api.post('/api/products/smart-search', { ingredientNames: ingredients });
            return response.data;
        } catch (error) {
            console.error('Lỗi khi tìm kiếm thông minh:', error);
            throw error;
        }
    },

    /**
     * Lấy chi tiết một sản phẩm theo ID
     * @param {number|string} id 
     * @returns {Promise} dữ liệu chi tiết sản phẩm
     */
    getProductById: async (id) => {
        try {
            const response = await api.get(`/api/products/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Lỗi khi lấy thông tin sản phẩm có id ${id}:`, error);
            throw error;
        }
    },

    getAiRecommendedProducts: async () => {
        try {
            const response = await axiosInstance.get('/api/products/ai-recommended');
            return response.data;
        } catch (error) {
            console.error('Error fetching AI recommended products:', error);
            throw error;
        }
    }
};

export default productService;
