import api from './../utils/axiosConfig';

export const restaurantService = {
    getAllRestaurants: async () => {
        try {
            const response = await api.get('/api/restaurants');
            return response.data; // Axios tự động parse JSON
        } catch (error) {
            console.error("Lỗi khi lấy danh sách nhà hàng:", error);
            throw error;
        }
    },

    searchRestaurants: async (name) => {
        try {
            const response = await api.get('/api/restaurants/search', {
                params: { name: name }
            });
            return response.data;
        } catch (error) {
            console.error("Lỗi khi tìm kiếm nhà hàng:", error);
            throw error;
        }
    },

    // Trong rmapService.js
    searchGlobal: async (query) => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`
            );
            const data = await response.json();
            return data.map(item => ({
                id: `global-${item.place_id}`,
                name: item.display_name.split(',')[0], 
                address: item.display_name,
                latitude: parseFloat(item.lat),
                longitude: parseFloat(item.lon),
                isGlobal: true // Đánh dấu để phân biệt với hàng trong DB
            }));
        } catch (error) {
            console.error("Global search error:", error);
            return [];
        }
    }
};