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
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`);
        const data = await response.json();
        return data.map(item => ({
            id: `osm-${item.place_id}`,
            name: item.display_name.split(',')[0],
            address: item.display_name,
            latitude: item.lat, 
            longitude: item.lon 
        }));
    }
};