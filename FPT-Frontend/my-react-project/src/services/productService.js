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
    searchProducts: async (keyword = '') => {
        try {
            const response = await api.get(`/api/products/search?keyword=${encodeURIComponent(keyword)}`);
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
    }
};

export default productService;
