import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Settings2, Sparkles, Clock, Flame, Heart } from 'lucide-react';
import '../../css/recommendations.css';

const mockRecommendations = [
    {
        id: 1,
        title: 'Shakshuka',
        description: 'A classic North African dish of eggs poached in a sauce of tomatoes, olive oil, peppers, onion and garlic.',
        match: 98,
        time: '20m',
        difficulty: 'Easy',
        calories: '350 kcal',
        image: 'https://images.unsplash.com/photo-1590412200988-a436970781fa?w=800&q=80'
    },
    {
        id: 2,
        title: 'Tomato Basil Omelette',
        description: 'Light and fluffy omelette filled with fresh garden tomatoes and fragrant basil leaves.',
        match: 95,
        time: '15m',
        difficulty: 'Easy',
        calories: '280 kcal',
        image: 'https://images.unsplash.com/photo-1510693206972-df098062cb71?w=800&q=80'
    },
    {
        id: 3,
        title: 'Caprese Frittata',
        description: 'An Italian egg-based dish similar to an omelette or crustless quiche, enriched with tomatoes and mozzarella.',
        match: 92,
        time: '25m',
        difficulty: 'Med',
        calories: '320 kcal',
        image: 'https://images.unsplash.com/photo-1606850246029-dd00e3f22718?w=800&q=80'
    },
    {
        id: 4,
        title: 'Egg Curry',
        description: 'Boiled eggs simmered in a spicy onion tomato gravy. Perfect comfort food.',
        match: 88,
        time: '35m',
        difficulty: 'Med',
        calories: '400 kcal',
        image: 'https://images.unsplash.com/photo-1628108537603-999d3e89643d?w=800&q=80'
    },
    {
        id: 5,
        title: 'Tomato Scramble',
        description: 'Quick Chinese-style tomato and egg stir fry. Sweet, savory, and incredibly easy.',
        match: 85,
        time: '10m',
        difficulty: 'Easy',
        calories: '210 kcal',
        image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&q=80'
    },
    {
        id: 6,
        title: 'Baked Eggs in Tomato',
        description: 'A visually stunning breakfast where eggs are baked inside hollowed-out tomatoes.',
        match: 82,
        time: '30m',
        difficulty: 'Med',
        calories: '310 kcal',
        image: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800&q=80'
    },
    {
        id: 7,
        title: 'Mediterranean Egg Salad',
        description: 'Fresh salad with hard-boiled eggs, cherry tomatoes, cucumbers, and feta cheese.',
        match: 78,
        time: '12m',
        difficulty: 'Easy',
        calories: '250 kcal',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80'
    },
    {
        id: 8,
        title: 'Egg Bruschetta',
        description: 'Toasted bread topped with scrambled eggs, diced tomatoes, and balsamic glaze.',
        match: 75,
        time: '18m',
        difficulty: 'Easy',
        calories: '290 kcal',
        image: 'https://images.unsplash.com/photo-1493770348161-369560ae357d?w=800&q=80'
    }
];

const Recommendations = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    return (
        <div className="discovery-layout animate-fade-in">
            {/* Left Sidebar - Filters */}
            <aside className="filter-sidebar">
                <div className="filter-header">
                    <Settings2 size={20} />
                    <h2>Refine Search</h2>
                </div>

                <div className="ai-suggestion-box">
                    <div className="box-header">
                        <h4>AI Suggestions</h4>
                        <Sparkles size={16} />
                    </div>
                    <p>Based on your inventory (Eggs, Tomatoes, Basil) and current weather (Sunny, 24°C).</p>
                </div>

                <div className="filter-group">
                    <h3 className="filter-title">Cuisine <span className="chevron">⌄</span></h3>
                    <div className="checkbox-list">
                        <label className="filter-label">
                            <input type="checkbox" /> <span>Italian</span>
                        </label>
                        <label className="filter-label">
                            <input type="checkbox" defaultChecked /> <span>Mediterranean</span>
                        </label>
                        <label className="filter-label">
                            <input type="checkbox" /> <span>Middle Eastern</span>
                        </label>
                    </div>
                </div>

                <div className="filter-group">
                    <h3 className="filter-title">Occasion <span className="chevron">⌄</span></h3>
                    <div className="checkbox-list">
                        <label className="filter-label">
                            <input type="checkbox" defaultChecked /> <span>Breakfast / Brunch</span>
                        </label>
                        <label className="filter-label">
                            <input type="checkbox" /> <span>Quick Lunch</span>
                        </label>
                    </div>
                </div>

                <div className="filter-group">
                    <h3 className="filter-title">Dietary <span className="chevron">⌄</span></h3>
                    <div className="checkbox-list">
                        <label className="filter-label">
                            <input type="checkbox" /> <span>Vegetarian</span>
                        </label>
                        <label className="filter-label">
                            <input type="checkbox" /> <span>Gluten Free</span>
                        </label>
                        <label className="filter-label">
                            <input type="checkbox" /> <span>Low Carb</span>
                        </label>
                    </div>
                </div>

                <div className="filter-group border-bottom-0">
                    <h3 className="filter-title">Weather <span className="chevron">⌄</span></h3>
                    <div className="checkbox-list">
                        <label className="filter-label">
                            <input type="checkbox" defaultChecked /> <span>Light & Fresh</span>
                        </label>
                    </div>
                </div>
            </aside>

            {/* Right Main Content */}
            <main className="discovery-main">
                <div className="breadcrumbs">
                    <Link to="/">Home</Link> <span className="separator">›</span> <span className="current">AI Discovery</span>
                </div>

                <h1 className="page-title">Recipe Discovery</h1>

                <div className="top-bar">
                    <div className="reason-badge">
                        <span className="ai-icon">⎔</span>
                        Because you have <span className="highlight">Eggs, Tomatoes</span> and <span className="highlight">Basil</span>...
                    </div>

                    <div className="sort-box">
                        <span className="sort-label">Sort by:</span>
                        <select className="sort-select">
                            <option>Relevance</option>
                            <option>Time</option>
                            <option>Calories</option>
                        </select>
                    </div>
                </div>

                <div className="recipe-grid-discovery">
                    {mockRecommendations.map((recipe) => (
                        <div key={recipe.id} className="discovery-card" onClick={() => navigate(`/recipe/${recipe.id}`, { state: { recipe } })}>
                            <div className="card-image-wrapper">
                                <img src={recipe.image} alt={recipe.title} />
                                <div className="match-badge">
                                    <Sparkles size={12} /> {recipe.match}% Match
                                </div>
                                <button className="favorite-btn" onClick={(e) => { e.stopPropagation(); }}>
                                    <Heart size={20} fill="#fff" stroke="#d1d5db" />
                                </button>
                            </div>

                            <div className="card-content">
                                <h3 className="card-title">{recipe.title}</h3>
                                <p className="card-desc">{recipe.description}</p>

                                <div className="card-meta">
                                    <span className="meta-item"><Clock size={14} /> {recipe.time}</span>
                                    <span className="meta-item bar">|</span>
                                    <span className="meta-item">ılı {recipe.difficulty}</span>
                                    <span className="meta-item bar">|</span>
                                    <span className="meta-item"><Flame size={14} /> {recipe.calories}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="pagination">
                    <button className="page-btn prev">‹</button>
                    <button className="page-btn active">1</button>
                    <button className="page-btn">2</button>
                    <button className="page-btn">3</button>
                    <span className="page-ellipsis">...</span>
                    <button className="page-btn next">›</button>
                </div>
            </main>
        </div>
    );
};

export default Recommendations;
