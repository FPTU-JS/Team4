import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Search, Camera, ArrowRight, TrendingUp, Heart, MapPin, Bookmark, Clock, Flame, Star } from 'lucide-react';
import productService from '../services/productService';
import categoryService from '../services/categoryService'; // Import categoryService
import '../css/home.css';

const Home = () => {
    const navigate = useNavigate();
    const [recipes, setRecipes] = useState([]);
    const [categories, setCategories] = useState([]); // Add state for categories
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchHomeData = async () => { // Rename to fetchHomeData to reflect fetching multiple things
            try {
                setIsLoading(true);
                // Fetch both products and categories concurrently
                const [productsData, categoriesData] = await Promise.all([
                    productService.searchProducts(''),
                    categoryService.getAllCategories() // Fetch categories
                ]);
                setRecipes(Array.isArray(productsData) ? productsData : []);
                setCategories(Array.isArray(categoriesData) ? categoriesData : []); // Set categories
            } catch (error) {
                console.error("Failed to load home data", error); // Update error message
            } finally {
                setIsLoading(false);
            }
        };

        fetchHomeData();
    }, []);

    // Get a few recipes for different sections
    const trendingRecipes = recipes.slice(0, 2);
    const personalizedRecipes = recipes.slice(2, 4);

    return (
        <div className="home-page animate-fade-in">
            {/* Hero Section */}
            <div className="hero-section">
                <div className="hero-content">
                    <div className="ai-badge">
                        <Sparkles size={14} className="badge-icon" /> AI-POWERED CHEF
                    </div>
                    <h1 className="hero-title">
                        Cook Smart with <span className="text-ai">AI</span>
                    </h1>
                    <p className="hero-subtitle">
                        Snap a photo of your fridge or list ingredients. Our AI will craft the perfect recipe for you instantly.
                    </p>

                    <div className="search-container">
                        <div className="search-input-wrapper">
                            <Search size={20} className="search-icon" />
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Type ingredients (e.g., avocado, eggs...)"
                            />
                        </div>
                        <button className="camera-btn" title="Snap a photo">
                            <Camera size={20} />
                        </button>
                        <button className="generate-btn" onClick={() => navigate('/ai-suggestions')}>
                            Generate <ArrowRight size={18} />
                        </button>
                    </div>

                    <div className="popular-searches">
                        <span>Popular searches:</span>
                        {isLoading ? (
                            <span>Loading categories...</span>
                        ) : categories.length === 0 ? (
                            <span>No popular categories found.</span>
                        ) : (
                            categories.slice(0, 3).map(category => ( // Map through fetched categories
                                <span key={category.categoryId} className="tag">{category.name}</span>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content Dashboard */}
            <div className="dashboard-grid">
                {/* Left Column */}
                <div className="main-feed">
                    {/* Trending Now */}
                    <div className="section-header">
                        <h2 className="section-title">
                            <TrendingUp size={24} color="#f59e0b" /> Trending Now
                        </h2>
                        <Link to="#" className="view-all">View all</Link>
                    </div>

                    <div className="trending-grid">
                        {isLoading ? (
                            <div>Loading trending recipes...</div>
                        ) : trendingRecipes.length === 0 ? (
                            <div>No recipes available yet.</div>
                        ) : (
                            trendingRecipes.map(recipe => (
                                <div key={`trend - ${recipe.productId} `} className="recipe-card" onClick={() => navigate(` / recipe / ${recipe.productId} `)}>
                                    <div className="recipe-image-container">
                                        <img src={recipe.imageUrl || 'https://via.placeholder.com/800x600?text=No+Image'} alt={recipe.name} className="recipe-image" />
                                        <div className="recipe-rating">
                                            <Star size={12} className="star-icon" fill="currentColor" /> {recipe.rating || 'N/A'}
                                        </div>
                                        <div className="recipe-meta">
                                            <span><Clock size={12} /> {recipe.cookingTime ? `${recipe.cookingTime} min` : '??'}</span>
                                            <span><Flame size={12} /> {recipe.calories ? `${recipe.calories} kcal` : '??'}</span>
                                        </div>
                                    </div>
                                    <div className="recipe-info">
                                        <h3 className="recipe-title">{recipe.name}</h3>
                                        <p className="recipe-category">{(recipe.tags || []).join(' • ')}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Personalized For You */}
                    <div className="section-header">
                        <h2 className="section-title">
                            <Heart size={24} color="#10b981" fill="#10b981" /> Personalized for You
                        </h2>
                    </div>

                    <div className="personalized-section">
                        <div className="plan-header">
                            <div className="plan-icon">
                                <Sparkles size={20} />
                            </div>
                            <div>
                                <h4 className="plan-title">Based on your preferences</h4>
                                <p className="plan-desc">We found {personalizedRecipes.length} recipes matching your profile</p>
                            </div>
                        </div>

                        {isLoading ? (
                            <div>Loading personalized recipes...</div>
                        ) : personalizedRecipes.length === 0 ? (
                            <div>No personalized recommendations yet.</div>
                        ) : (
                            personalizedRecipes.map(recipe => (
                                <div key={`pers - ${recipe.productId} `} className="list-recipe-item">
                                    <img src={recipe.imageUrl || 'https://via.placeholder.com/200?text=No+Image'} alt={recipe.name} className="list-recipe-image" />
                                    <div className="list-recipe-details">
                                        <h4 className="list-recipe-title">{recipe.name}</h4>
                                        <p className="list-recipe-desc">{recipe.description}</p>
                                        <div className="list-recipe-stats">{recipe.calories ? `${recipe.calories} kcal` : '??'} • {(recipe.tags || [])[0]}</div>
                                    </div>
                                    <Bookmark className="bookmark-icon" size={20} />
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Right Column / Sidebar */}
                <div className="sidebar">
                    {/* Local Markets Map */}
                    <div className="sidebar-card">
                        <h3 className="sidebar-title">
                            Local Markets
                            <Link to="/map" className="view-all">Open Map</Link>
                        </h3>
                        <div className="map-container">
                            <div className="map-pin-overlay">
                                <MapPin size={16} className="pin-icon" />
                                <div>
                                    <strong>Whole Foods Market</strong><br />
                                    <span style={{ color: '#6b7280' }}>0.8 mi away</span>
                                </div>
                            </div>
                        </div>
                        <button className="btn-outline-green">Find Ingredients Nearby</button>
                    </div>

                    {/* Today's Nutrition */}
                    <div className="sidebar-card nutrition-card">
                        <h3 className="sidebar-title">Today's Nutrition</h3>

                        <div className="nutrition-summary">
                            <div className="circle-chart">
                                <span className="kcal-val">1,250</span>
                                <span className="kcal-label">KCAL LEFT</span>
                            </div>
                            <div className="macros">
                                <div className="macro-item">
                                    <div className="macro-header">
                                        <span className="macro-name">Protein</span>
                                        <span className="macro-val">45/120g</span>
                                    </div>
                                    <div className="progress-bar">
                                        <div className="progress-fill progress-protein"></div>
                                    </div>
                                </div>
                                <div className="macro-item">
                                    <div className="macro-header">
                                        <span className="macro-name">Carbs</span>
                                        <span className="macro-val">90/200g</span>
                                    </div>
                                    <div className="progress-bar">
                                        <div className="progress-fill progress-carbs"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="meal-list">
                            <div className="meal-item completed">
                                <div className="meal-name">
                                    <span className="meal-dot"></span> Oatmeal & Berries
                                </div>
                                <span className="meal-type">Breakfast</span>
                            </div>
                            <div className="meal-item current">
                                <div className="meal-name">
                                    <span className="meal-dot"></span> Chicken Caesar Wrap
                                </div>
                                <span className="meal-type">Lunch</span>
                            </div>
                            <div className="meal-item">
                                <div className="meal-name">
                                    <span className="meal-dot"></span> Grilled Salmon & Asparagus
                                </div>
                                <span className="meal-type">Dinner</span>
                            </div>
                        </div>
                    </div>

                    {/* Community Top Picks */}
                    <div className="sidebar-card">
                        <h3 className="sidebar-title">Community Top Picks</h3>
                        <div className="user-avatars">
                            <div className="avatar-item">
                                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" alt="User" className="avatar-img" />
                                <span className="avatar-name">Sarah K.</span>
                            </div>
                            <div className="avatar-item">
                                <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&q=80" alt="User" className="avatar-img" />
                                <span className="avatar-name">Mike R.</span>
                            </div>
                            <div className="avatar-item">
                                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80" alt="User" className="avatar-img" />
                                <span className="avatar-name">Elena G.</span>
                            </div>
                            <div className="avatar-item">
                                <div className="avatar-add">+</div>
                                <span className="avatar-name">Join</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
