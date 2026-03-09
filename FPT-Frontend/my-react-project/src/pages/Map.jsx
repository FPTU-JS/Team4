import React, { useState, useEffect } from 'react';
import '../css/map.css';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Search, MapPin, Star, Heart, Clock, Truck, Footprints, Navigation, Plus, Minus, Crosshair, SlidersHorizontal } from 'lucide-react';

// Fix for default marker icons in React Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const Map = () => {
    const [userLocation, setUserLocation] = useState(null);

    const handleLocateUser = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation([position.coords.latitude, position.coords.longitude]);
                },
                (error) => {
                    console.error("Error getting location:", error);
                }
            );
        }
    };

    useEffect(() => {
        handleLocateUser();
    }, []);

    const MapRecenter = ({ location }) => {
        const map = useMap();
        useEffect(() => {
            if (location) {
                map.flyTo(location, 14);
            }
        }, [location, map]);
        return null;
    };

    const MapOverlayControls = () => {
        const map = useMap();
        return (
            <div className="map-controls">
                <button className="control-btn" onClick={() => {
                    if (userLocation) {
                        map.flyTo(userLocation, 15);
                    } else {
                        handleLocateUser();
                    }
                }} title="Tìm vị trí của tôi">
                    <Crosshair size={20} />
                </button>
                <div className="zoom-controls">
                    <button className="control-btn" onClick={() => map.zoomIn()} title="Phóng to"><Plus size={20} /></button>
                    <button className="control-btn" onClick={() => map.zoomOut()} title="Thu nhỏ"><Minus size={20} /></button>
                </div>
            </div>
        );
    };

    const recommendations = [
        {
            id: 1,
            name: 'Green Leaf Garden',
            image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=60',
            tags: ['VEGAN'],
            rating: 4.9,
            distance: '0.8 mi',
            time: '15-20 min',
            delivery: 'Free',
            deliveryColor: '#10b981',
            latitude: 10.7769,
            longitude: 106.7009
        },
        {
            id: 2,
            name: "Ocean's Catch",
            image: 'https://images.unsplash.com/photo-1615141982883-c7da0f69f2fa?w=800&auto=format&fit=crop&q=60',
            tags: ['SEAFOOD'],
            rating: 4.7,
            distance: '1.4 mi',
            time: '25-30 min',
            delivery: '$3.99',
            deliveryColor: '#6b7280',
            latitude: 10.7745,
            longitude: 106.6980
        },
        {
            id: 3,
            name: 'The Gilded Plate',
            image: 'https://images.unsplash.com/photo-1544025162-8315ea07ec6c?w=800&auto=format&fit=crop&q=60',
            tags: ['FINE DINING'],
            rating: 5.0,
            distance: '2.1 mi',
            time: '40-50 min',
            delivery: '$5.99',
            deliveryColor: '#6b7280',
            latitude: 10.7790,
            longitude: 106.7020
        },
    ];

    const center = userLocation || [10.7769, 106.7009]; // Default center of the map

    return (
        <div className="map-page-container">
            <div className="map-view-container">
                {/* Search Bar - Specially for Mobile layout overlay */}
                <div className="map-search-wrapper">
                    <div className="map-search-input-box">
                        <Search size={20} color="#9ca3af" />
                        <input type="text" placeholder="Search restaurants, cuisines..." />
                        <SlidersHorizontal size={20} color="#10b981" />
                    </div>
                </div>

                {/* Map Floating Filters */}
                <div className="map-top-filters">
                    <button className="map-filter-chip active-green">Open Now</button>
                    <button className="map-filter-chip">Free Delivery</button>
                    <button className="map-filter-chip">Top Rated</button>
                </div>

                {/* Map Pins Using React Leaflet */}
                <MapContainer center={center} zoom={15} style={{ height: '100%', width: '100%' }} zoomControl={false}>
                    <MapRecenter location={userLocation} />
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {/* User Location Marker */}
                    {userLocation && (
                        <Marker position={userLocation}>
                            <Popup>
                                <div style={{ textAlign: 'center' }}>
                                    <h4 style={{ margin: '0 0 5px 0', color: '#3b82f6' }}>Vị trí của bạn</h4>
                                    <p style={{ margin: 0, color: '#666', fontSize: '12px' }}>You are here</p>
                                </div>
                            </Popup>
                        </Marker>
                    )}

                    {/* Restaurant Markers */}
                    {recommendations.map(place => (
                        <Marker key={place.id} position={[place.latitude, place.longitude]}>
                            <Popup>
                                <div style={{ textAlign: 'center' }}>
                                    <h4 style={{ margin: '0 0 5px 0' }}>{place.name}</h4>
                                    <p style={{ margin: 0, color: '#666', fontSize: '12px' }}>{place.tags.join(', ')}</p>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                    <MapOverlayControls />
                </MapContainer>
            </div>

            <div className="map-sidebar">
                <div className="bottom-sheet-drag-handle"></div>
                <div className="sidebar-header">
                    <div className="header-title">
                        <h2>Nearby Restaurants</h2>
                        <a href="#" className="view-all">View all</a>
                    </div>
                </div>

                <div className="recommendations-list">
                    {recommendations.map(place => (
                        <div key={place.id} className="restaurant-card">
                            <img src={place.image} alt={place.name} className="card-image" />
                            <div className="card-content">
                                <div className="card-header-row">
                                    <h3>{place.name}</h3>
                                    <div className="rating badge-rating">
                                        <Star size={12} fill="#10b981" color="#10b981" />
                                        <span>{place.rating.toFixed(1)}</span>
                                    </div>
                                </div>
                                <p className="card-subtitle">Healthy • Salad • Vegan Friendly</p>
                                <div className="card-meta">
                                    <div className="meta-item">
                                        <Footprints size={14} /> {place.distance}
                                    </div>
                                    <div className="meta-item">
                                        <Clock size={14} /> {place.time}
                                    </div>
                                    <div className="meta-item" style={{ color: place.deliveryColor }}>
                                        <Truck size={14} /> {place.delivery}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div >
        </div >
    );
};

export default Map;
