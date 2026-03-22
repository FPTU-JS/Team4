import React, { useState, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Search, Star, Clock, Truck, Footprints, Plus, Minus, Crosshair, SlidersHorizontal } from 'lucide-react';
import { restaurantService } from '../services/rmapService';

import 'leaflet/dist/leaflet.css';
import '../css/map.css';

// Fix lỗi hiển thị icon mặc định của Leaflet trong React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Component hỗ trợ điều khiển Camera của bản đồ
const MapRecenter = ({ location }) => {
    const map = useMap();
    useEffect(() => {
        if (location) {
            map.flyTo(location, 15);
        }
    }, [location, map]);
    return null;
};

const MapOverlayControls = ({ onLocate }) => {
    const map = useMap();
    return (
        <div className="map-controls">
            <button className="control-btn" onClick={() => onLocate()} title="Tìm vị trí của tôi">
                <Crosshair size={20} />
            </button>
            <div className="zoom-controls">
                <button className="control-btn" onClick={() => map.zoomIn()} title="Phóng to"><Plus size={20} /></button>
                <button className="control-btn" onClick={() => map.zoomOut()} title="Thu nhỏ"><Minus size={20} /></button>
            </div>
        </div>
    );
};

const Map = () => {
    const [userLocation, setUserLocation] = useState(null);
    const [restaurants, setRestaurants] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);

    // 1. Hàm lấy dữ liệu từ API (Spring Boot qua Axios)
    const fetchRestaurants = useCallback(async (name = "") => {
        setLoading(true);
        try {
            // 1. Lấy dữ liệu từ Local Database (Spring Boot)
            let localData = [];
            try {
                if (name) {
                    localData = await restaurantService.searchRestaurants(name);
                } else {
                    localData = await restaurantService.getAllRestaurants();
                }
            } catch (e) { console.error("Local DB error:", e); }

            const formattedLocal = localData.map((res, index) => ({
                ...res,
                id: res.restaurantId || `local-${index}`,
                // Đảm bảo lấy đúng tọa độ, nếu null thì lấy mặc định để không bị crash map
                lat: parseFloat(res.latitude) || 10.7769,
                lng: parseFloat(res.longitude) || 106.7009,
                displayImage: res.logoUrl || 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800',
                source: 'database'
            }));

            // 2. Lấy dữ liệu từ Global (OSM)
            let globalData = [];
            if (name && name.length > 2) {
                try {
                    globalData = await restaurantService.searchGlobal(name);
                } catch (e) { console.error("Global search error:", e); }
            }

            const formattedGlobal = globalData.map(res => ({
                ...res,
                // OSM thường trả về lat/lng trong hàm searchGlobal của bạn đã parse rồi
                // nhưng ta bọc lại cho chắc chắn
                lat: parseFloat(res.latitude),
                lng: parseFloat(res.longitude),
                displayImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800', // Ảnh mặc định cho OSM
                source: 'osm'
            }));

            // 3. Gộp dữ liệu
            const combined = [...formattedLocal, ...formattedGlobal];
            setRestaurants(combined);

            // 4. Di chuyển camera đến kết quả đầu tiên nếu có tìm kiếm
            if (name && combined.length > 0) {
                setUserLocation([combined[0].lat, combined[0].lng]);
            }

        } catch (error) {
            console.error("General Search error:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    // 2. Lấy vị trí người dùng
    const handleLocateUser = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const coords = [position.coords.latitude, position.coords.longitude];
                    setUserLocation(coords);
                },
                (error) => console.error("Lỗi định vị:", error)
            );
        }
    };

    useEffect(() => {
        handleLocateUser();
        fetchRestaurants();
    }, [fetchRestaurants]);

    // 3. Xử lý tìm kiếm khi nhấn Enter
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            fetchRestaurants(searchTerm);
        }
    };

    return (
        <div className="map-page-container">
            <div className="map-view-container">
                {/* Search Bar Overlay */}
                <div className="map-search-wrapper">
                    <div className="map-search-input-box">
                        <Search size={20} color="#9ca3af" />
                        <input
                            type="text"
                            placeholder="Search for restaurants..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <SlidersHorizontal size={20} color="#10b981" />
                    </div>
                </div>

                {/* Map Pins */}
                <MapContainer
                    center={[10.7769, 106.7009]}
                    zoom={15}
                    style={{ height: '100%', width: '100%' }}
                    zoomControl={false}
                >
                    <TileLayer
                        attribution='&copy; OpenStreetMap contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <MapRecenter location={userLocation} />

                    {/* Marker cho người dùng */}
                    {userLocation && (
                        <Marker position={userLocation}>
                            <Popup>Bạn đang ở đây</Popup>
                        </Marker>
                    )}

                    {/* Markers cho nhà hàng từ Database */}
                    {restaurants.map(place => (
                        <Marker key={place.id} position={[place.lat, place.lng]}>
                            <Popup>
                                <div style={{ textAlign: 'center' }}>
                                    <h4 style={{ margin: '0' }}>{place.name}</h4>
                                    <p style={{ fontSize: '12px', margin: '5px 0' }}>{place.address}</p>
                                    <span style={{ color: '#10b981' }}>⭐ {place.rating || 0}</span>
                                </div>
                            </Popup>
                        </Marker>
                    ))}

                    <MapOverlayControls onLocate={handleLocateUser} />
                </MapContainer>
            </div>

            {/* Sidebar danh sách */}
            <div className="map-sidebar">
                <div className="sidebar-header">
                    <h2>{loading ? "Đang tải dữ liệu..." : "Nearby Restaurants"}</h2>
                </div>

                <div className="recommendations-list">
                    {restaurants.length === 0 && !loading && <p style={{ padding: '20px' }}>No data for searching...</p>}

                    {restaurants.map(place => (
                        <div
                            key={place.id}
                            className="restaurant-card"
                            onClick={() => setUserLocation([place.lat, place.lng])}
                        >
                            <img src={place.displayImage} alt={place.name} className="card-image" />
                            <div className="card-content">
                                <h3>{place.name}</h3>
                                <div className="rating badge-rating">
                                    <Star size={12} fill="#10b981" color="#10b981" />
                                    <span>{place.rating || 0}</span>
                                </div>
                                <p className="card-subtitle">{place.address}</p>
                                <div className="card-meta">
                                    <div className="meta-item"><Clock size={14} /> 15-20 min</div>
                                    <div className="meta-item" style={{ color: '#10b981' }}><Truck size={14} /> Free</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Map;