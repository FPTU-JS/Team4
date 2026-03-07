import React, { useState } from 'react';
import { Search, Clock, Flame, Heart, Star, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import '../css/recipes.css';

const mockCategories = ['All Recipes', 'Breakfast', 'Vegan & Plant-based', 'Seafood Specials', 'Quick & Easy (15m)', 'Desserts', 'Keto Friendly'];

const mockRecipes = [
    {
        id: 1,
        title: 'Roasted Salmon & Greens',
        description: 'A nutrient-dense bowl featuring fresh Atlantic salmon and seasonal kale.',
        time: '25 min',
        calories: '420 kcal',
        rating: '4.9',
        isAiRecommended: true,
        tags: ['Healthy', 'High Protein'],
        image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80',
        isFavorite: false
    },
    {
        id: 2,
        title: 'Creamy Truffle Basil Pasta',
        description: 'Luxurious truffle oil blended with fresh basil and handmade linguine.',
        time: '20 min',
        calories: '580 kcal',
        rating: '4.7',
        isAiRecommended: false,
        tags: ['Italian', 'Vegetarian'],
        image: 'https://images.unsplash.com/photo-1621510456681-2330135e5871?w=800&q=80',
        isFavorite: false
    },
    {
        id: 3,
        title: 'Salmon & Avocado Poke Bowl',
        description: 'Fresh diced salmon, avocado, and edamame over a bed of quinoa.',
        time: '15 min',
        calories: '320 kcal',
        rating: '4.8',
        isAiRecommended: true,
        tags: ['Poke', 'Low Carb'],
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
        isFavorite: true
    },
    {
        id: 4,
        title: 'Citrus Summer Salad',
        description: 'Zesty orange slices with microgreens and a light vinaigrette.',
        time: '10 min',
        calories: '180 kcal',
        rating: '4.5',
        isAiRecommended: false,
        tags: ['Vegan', 'Light'],
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
        isFavorite: false
    },
    {
        id: 5,
        title: 'Stone-Fired Margherita',
        description: 'Classic thin crust with San Marzano tomatoes and buffalo mozzarella.',
        time: '35 min',
        calories: '890 kcal',
        rating: '4.9',
        isAiRecommended: false,
        tags: ['Artisanal', 'Classic'],
        image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a30536?w=800&q=80',
        isFavorite: false
    },
    {
        id: 6,
        title: 'Garlic Butter Ribeye',
        description: 'Prime cut steak seared to perfection with aromatic herb butter.',
        time: '45 min',
        calories: '720 kcal',
        rating: '5.0',
        isAiRecommended: true,
        tags: ['Gourmet', 'Protein+'],
        image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=80',
        isFavorite: false
    }
];

const Recipes = () => {
    const [activeCategory, setActiveCategory] = useState('All Recipes');

    return (
        <div className="recipes-hub fade-in">
            {/* Header Area */}
            <div className="hub-header">
                <h1 className="heading-h1">Recipe Discovery Hub</h1>
                <p className="subtitle">Explore over 10,000 curated recipes by chefs and AI.</p>

                <div className="category-pills">
                    {mockCategories.map(cat => (
                        <button
                            key={cat}
                            className={`pill-btn ${activeCategory === cat ? 'active' : ''}`}
                            onClick={() => setActiveCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="hub-layout">
                {/* Left Sidebar Filters */}
                <aside className="hub-sidebar">
                    <div className="search-box">
                        <Search size={20} className="search-icon" />
                        <input type="text" placeholder="Search recipes..." />
                    </div>

                    <div className="filter-group">
                        <h3 className="filter-title">Cooking Time</h3>
                        <label className="radio-label">
                            <input type="radio" name="time" />
                            <span className="radio-text">Under 15 mins</span>
                        </label>
                        <label className="radio-label">
                            <input type="radio" name="time" />
                            <span className="radio-text">15 - 30 mins</span>
                        </label>
                        <label className="radio-label">
                            <input type="radio" name="time" />
                            <span className="radio-text">30 - 60 mins</span>
                        </label>
                    </div>

                    <div className="filter-group">
                        <h3 className="filter-title">Calories</h3>
                        <div className="range-slider-wrapper">
                            <input type="range" min="0" max="1500" className="styled-slider" />
                            <div className="range-labels">
                                <span>0 kcal</span>
                                <span>1500+ kcal</span>
                            </div>
                        </div>
                    </div>

                    <div className="filter-group">
                        <h3 className="filter-title">Difficulty</h3>
                        <div className="difficulty-buttons">
                            <button className="diff-btn">Beginner</button>
                            <button className="diff-btn">Intermediate</button>
                            <button className="diff-btn">Advanced</button>
                        </div>
                    </div>

                    <div className="filter-group">
                        <h3 className="filter-title">Dietary Preferences</h3>
                        <label className="checkbox-label">
                            <input type="checkbox" defaultChecked />
                            <span className="checkbox-text">Gluten-Free</span>
                        </label>
                        <label className="checkbox-label">
                            <input type="checkbox" />
                            <span className="checkbox-text">Dairy-Free</span>
                        </label>
                        <label className="checkbox-label">
                            <input type="checkbox" />
                            <span className="checkbox-text">Nut-Free</span>
                        </label>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="hub-main">
                    <div className="hub-results-header">
                        <span className="results-count">Showing 24 of 1,248 results</span>
                        <div className="sort-box">
                            <span style={{ color: '#6b7280', fontSize: '0.9rem', marginRight: '0.5rem' }}>Sort by:</span>
                            <select className="sort-select">
                                <option>Most Popular</option>
                                <option>Highest Rated</option>
                                <option>Newest</option>
                            </select>
                        </div>
                    </div>

                    <div className="hub-grid">
                        {mockRecipes.map(recipe => (
                            <div key={recipe.id} className="recipe-card-hub">
                                <div className="card-media">
                                    <img src={recipe.image} alt={recipe.title} />

                                    <div className="card-badges-top">
                                        <div className="left-badges">
                                            {recipe.isAiRecommended && (
                                                <span className="badge ai-badge"><Sparkles size={12} /> AI RECOMMENDED</span>
                                            )}
                                            <span className="badge rating-badge"><Star size={12} fill="currentColor" /> {recipe.rating}</span>
                                        </div>
                                        <button className={`heart-btn ${recipe.isFavorite ? 'active' : ''}`}>
                                            <Heart size={18} fill={recipe.isFavorite ? "#ef4444" : "none"} stroke={recipe.isFavorite ? "#ef4444" : "currentColor"} />
                                        </button>
                                    </div>
                                </div>

                                <div className="card-content">
                                    <div className="card-metrics">
                                        <span className="metric"><Clock size={14} /> {recipe.time}</span>
                                        <span className="metric"><Flame size={14} /> {recipe.calories}</span>
                                    </div>
                                    <h3 className="card-title">{recipe.title}</h3>
                                    <p className="card-desc">{recipe.description}</p>
                                    <div className="card-tags">
                                        {recipe.tags.map(tag => (
                                            <span key={tag} className="tag">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="pagination">
                        <button className="page-btn nav-btn"><ChevronLeft size={18} /></button>
                        <button className="page-btn active">1</button>
                        <button className="page-btn">2</button>
                        <button className="page-btn">3</button>
                        <span className="page-dots">...</span>
                        <button className="page-btn">12</button>
                        <button className="page-btn nav-btn"><ChevronRight size={18} /></button>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Recipes;
