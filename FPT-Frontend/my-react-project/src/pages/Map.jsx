import React, { useState } from 'react';
import '../css/map.css';
import { Search, MapPin, Star, Heart, Clock, Truck, Footprints, Navigation, Plus, Minus, Crosshair } from 'lucide-react';

const Map = () => {

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
            deliveryColor: '#10b981'
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
            deliveryColor: '#6b7280'
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
            deliveryColor: '#6b7280'
        },
    ];

    return (
        <div className="map-page-container">
            <div className="map-view-container">
                {/* Map Floating Filters */}
                <div className="map-top-filters">
                    <button className="map-filter-chip"><Clock size={16} /> Open Now</button>
                    <button className="map-filter-chip"><Star size={16} fill="#f59e0b" color="#f59e0b" /> Top Rated</button>
                    <button className="map-filter-chip"><Truck size={16} color="#10b981" /> Free Delivery</button>
                    <button className="map-filter-chip"><div className="vegan-leaf-icon"></div> Vegan</button>
                </div>

                {/* Map Pins Mockup */}
                <div className="map-pin-custom pin-vegan" style={{ top: '32%', left: '26%' }}>
                    <div className="pin-icon vegan-icon"></div>
                </div>
                <div className="map-pin-custom pin-seafood" style={{ top: '55%', left: '42%' }}>
                    <div className="pin-icon seafood-icon"></div>
                </div>
                <div className="map-pin-custom pin-dining" style={{ top: '75%', left: '33%' }}>
                    <div className="pin-icon dining-icon"></div>
                </div>

                {/* Map Controls */}
                <div className="map-controls">
                    <button className="control-btn"><Crosshair size={20} /></button>
                    <div className="zoom-controls">
                        <button className="control-btn"><Plus size={20} /></button>
                        <button className="control-btn"><Minus size={20} /></button>
                    </div>
                </div>
            </div>

            <div className="map-sidebar">
                <div className="sidebar-header">
                    <div className="header-title">
                        <h2>Recommendations</h2>
                        <a href="#" className="view-all">View all</a>
                    </div>
                    <div className="sidebar-filters">
                        <button className="filter-chip active">Near You</button>
                        <button className="filter-chip">Popular</button>
                        <button className="filter-chip">Budget</button>
                        <button className="filter-chip">New</button>
                    </div>
                </div>

                <div className="recommendations-list">
                    {recommendations.map(place => (
                        <div key={place.id} className="restaurant-card">
                            <div className="card-image-wrapper">
                                <img src={place.image} alt={place.name} className="card-image" />
                                <button className="favorite-btn">
                                    <Heart size={18} />
                                </button>
                                <div className="card-tags">
                                    {place.tags.map(tag => (
                                        <span key={tag} className={`card-tag tag-${tag.toLowerCase().replace(' ', '-')}`}>{tag}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="card-content">
                                <div className="card-header-row">
                                    <h3>{place.name}</h3>
                                    <div className="rating">
                                        <Star size={14} fill="#f59e0b" color="#f59e0b" />
                                        <span>{place.rating.toFixed(1)}</span>
                                    </div>
                                </div>
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
            </div>
        </div>
    );
};

export default Map;
